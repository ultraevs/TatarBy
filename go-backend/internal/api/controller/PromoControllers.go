package controller

import (
	"app/internal/database"
	"app/internal/model"
	"app/internal/templates"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

// AddNewPromo добавить новый промокод.
// @Summary Добавить новый промокод
// @Description Создает новый промокод для юзера.
// @Accept json
// @Produce json
// @Param request body model.NewPromo true "Запрос на создание нового промокода"
// @Success 200 {object} model.CodeResponse "Промокод создан"
// @Failure 500 {object} model.ErrorResponse "Не удалось создать промокод"
// @Tags Promo
// @Router /v1/add_new_promo [post]
func AddNewPromo(context *gin.Context) {
	var promo model.NewPromo
	if context.Bind(&promo) != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}

	var existingEmail string
	err := database.Db.QueryRow("SELECT email FROM tatarby_promo WHERE email = $1", promo.Email).Scan(&existingEmail)
	if err == nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Email already exists"})
		return
	} else if !errors.Is(err, sql.ErrNoRows) {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Can't check if email exists"})
		return
	}

	promoCode := generatePromo()
	_, err = database.Db.Exec("INSERT INTO tatarby_promo (email, promo) VALUES ($1, $2)", promo.Email, promoCode)
	if err != nil {
		fmt.Println(err)
		return
	}

	sender := NewGmailSender("TatarBY", os.Getenv("EMAIL_ADDRESS"), os.Getenv("EMAIL_PASSWORD"))
	subject := "Ваш промокод"
	content := fmt.Sprintf(templates.PromoTemplate(promoCode))
	to := []string{promo.Email}
	err = sender.SendEmail(subject, content, to, nil, nil)
	if err != nil {
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "success"})
}

func generatePromo() string {
	bytes := make([]byte, 4)
	_, err := rand.Read(bytes)
	if err != nil {
		return ""
	}
	return hex.EncodeToString(bytes)
}

// RedeemPromo проверить промокод.
// @Summary Проверить промокод
// @Description Сверяет емайл аккаунта и введенный промокод.
// @Accept json
// @Produce json
// @Param request body model.Promo true "Запрос на проверку промокода"
// @Success 200 {object} model.CodeResponse "Промокод подтвержден"
// @Failure 500 {object} model.ErrorResponse "Не удалось подтвердить промокод"
// @Tags Promo
// @Router /v1/redeem_promo [post]
func RedeemPromo(context *gin.Context) {
	var promo model.Promo
	if context.Bind(&promo) != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}
	Email := context.MustGet("Email").(string)
	var userName string
	err := database.Db.QueryRow("SELECT name FROM tatarby_users WHERE email = $1", Email).Scan(&userName)
	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
	}

	var validPromoCode bool
	err = database.Db.QueryRow("SELECT EXISTS (SELECT 1 FROM tatarby_promo WHERE email = $1 AND promo = $2)", Email, promo.PromoCode).Scan(&validPromoCode)
	if err != nil {
		return
	}
	if !validPromoCode {
		context.JSON(http.StatusNotFound, gin.H{"error": "PromoCode not found"})
	}

	_, err = database.Db.Exec("UPDATE tatarby_rating SET score = score + 100 WHERE name = $1", userName)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}

	_, err = database.Db.Exec("DELETE FROM tatarby_promo WHERE email = $1 AND promo = $2", Email, promo.PromoCode)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Error with deleting promo"})
	}

	context.JSON(http.StatusOK, gin.H{"success": "Promo Code used"})
}
