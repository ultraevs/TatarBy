package controller

import (
	"app/internal/database"
	"app/internal/model"
	"database/sql"
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"sort"
)

// GetRating Получить рейтинг пользователей.
// @Summary Получить рейтинг пользователей
// @Description Получает общий рейтинг пользователей
// @Accept json
// @Produce json
// @Success 200 {object} model.CodeResponse "Рейтинг получен"
// @Failure 500 {object} model.ErrorResponse "Не удалось получить рейтинг"
// @Tags Rating
// @Router /v1/rating [get]
func GetRating(context *gin.Context) {
	rows, err := database.Db.Query("SELECT name, score FROM tatarby_rating")
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {

		}
	}(rows)

	var rating []model.Rating
	for rows.Next() {
		var userRating model.Rating
		err := rows.Scan(&userRating.NickName, &userRating.Score)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		rating = append(rating, userRating)
	}

	sort.Slice(rating, func(i, j int) bool {
		return rating[i].Score > rating[j].Score
	})

	context.JSON(http.StatusOK, rating)
}

// UpdateUserRating Обновить рейтинг конкретного пользователя.
// @Summary Обновить рейтинг конкретного пользователя
// @Description Добавляет в рейтинг пользователя полученные баллы
// @Accept json
// @Produce json
// @Param request body model.Rating true "Запрос на обновление рейтинга пользователя"
// @Success 200 {object} model.CodeResponse "Рейтинг обновлен"
// @Failure 400 {object} model.ErrorResponse "Не удалось найти пользователя"
// @Failure 500 {object} model.ErrorResponse "Не удалось обновить рейтинг"
// @Tags Rating
// @Router /v1/update_user_rating [put]
func UpdateUserRating(context *gin.Context) {
	var requestData model.Rating
	if err := context.BindJSON(&requestData); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var userRating model.Rating
	err := database.Db.QueryRow("SELECT name, score FROM tatarby_rating WHERE name = $1", requestData.NickName).Scan(&userRating.NickName, &userRating.Score)
	if errors.Is(err, sql.ErrNoRows) {
		_, err := database.Db.Exec("INSERT INTO tatarby_rating (name, score) VALUES ($1, $2)", requestData.NickName, 0)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		userRating.NickName = requestData.NickName
		userRating.Score = 0
	} else if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	userRating.Score += requestData.Score
	_, err = database.Db.Exec("UPDATE tatarby_rating SET score = $1 WHERE name = $2", userRating.Score, userRating.NickName)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Рейтинг обновлен"})
}

// GetUserRating Получить рейтинг конкретного пользователя.
// @Summary Получить рейтинг конкретного пользователя
// @Description Возвращает рейтинг нужного пользователя
// @Accept json
// @Produce json
// @Param request body model.UserRating true "Запрос на получения рейтинга пользователя"
// @Success 200 {object} model.CodeResponse "Рейтинг получен"
// @Failure 400 {object} model.ErrorResponse "Не удалось найти пользователя"
// @Failure 500 {object} model.ErrorResponse "Не удалось получить рейтинг"
// @Tags Rating
// @Router /v1/get_user_rating [post]
func GetUserRating(context *gin.Context) {
	var nickname model.UserRating
	if err := context.BindJSON(&nickname); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var userRating model.Rating
	err := database.Db.QueryRow("SELECT name, score FROM tatarby_rating WHERE name = $1", nickname.NickName).Scan(&userRating.NickName, &userRating.Score)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, gin.H{"nickanme": userRating.NickName, "score": userRating.Score})
}
