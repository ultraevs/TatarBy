package controller

import (
	"app/internal/database"
	"app/internal/model"
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"mime/multipart"
	"net/http"
	"os"
)

// UserInfo получить инфо пользователя.
// @Summary Получить инфо пользователя
// @Description Предоставляет информацию юзера.
// @Accept json
// @Produce json
// @Success 200 {object} model.CodeResponse "Информация получена"
// @Failure 400 {object} model.ErrorResponse "Не удалось получить информацию"
// @Tags Profile
// @Security CookieAuth
// @Router /v1/user_info [get]
func UserInfo(context *gin.Context) {
	Email := context.MustGet("Email").(string)
	var user model.UserInfo
	err := database.Db.QueryRow("SELECT email, name, photo_url, referral_link FROM tatarby_users WHERE email = $1", Email).Scan(&user.Email, &user.Name, &user.Photo, &user.Ref)
	photo := ""
	if user.Photo.Valid {
		photo = user.Photo.String
	}
	context.JSON(http.StatusOK, gin.H{"email": user.Email, "name": user.Name, "photo": photo, "referal": user.Ref})
	fmt.Println(err)
}

// AddUserPhoto загружает фото пользователя.
// @Summary Загружает фото пользователя
// @Description Загружает фото пользователя и сохраняет URL в базе данных
// @Accept multipart/form-data
// @Produce json
// @Success 200 {object} model.CodeResponse "Фото загружено"
// @Failure 400 {object} model.ErrorResponse "Не удалось загрузить фото"
// @Tags Profile
// @Security CookieAuth
// @Router /v1/user_photo [post]
func AddUserPhoto(context *gin.Context) {
	Email := context.MustGet("Email").(string)

	file, header, err := context.Request.FormFile("photo")
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Error with getting photo"})
		return
	}
	defer func(file multipart.File) {
		err := file.Close()
		if err != nil {

		}
	}(file)

	filePath := "uploads/" + header.Filename
	out, err := os.Create(filePath)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Can't save the file"})
		return
	}
	defer func(out *os.File) {
		err := out.Close()
		if err != nil {

		}
	}(out)

	_, err = io.Copy(out, file)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Can't save the file"})
		return
	}

	photoURL := "http://tatarby.shmyaks.ru/v1/" + filePath
	_, err = database.Db.Exec("UPDATE tatarby_users SET photo_url = $1 WHERE email = $2", photoURL, Email)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Error with updating photo"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"photo_url": photoURL})
}

// AddUserNickname изменяет никнейм пользователя
// @Summary Изменяет никнейм пользователя
// @Description Изменяет никнейм пользователя и сохраняет изменения в базе данных
// @Accept json
// @Produce json
// @Param nickname body model.NewNickname true "New Nickname"
// @Success 200 {object} model.CodeResponse "Никнейм изменен"
// @Failure 400 {object} model.ErrorResponse "Не удалось изменить никнейм"
// @Tags Profile
// @Security CookieAuth
// @Router /v1/user_nickname [put]
func AddUserNickname(context *gin.Context) {
	Email := context.MustGet("Email").(string)

	var nicknameRequest model.NewNickname

	if err := context.ShouldBindJSON(&nicknameRequest); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Wrong data"})
		return
	}

	_, err := database.Db.Exec("UPDATE tatarby_users SET name = $1 WHERE email = $2", nicknameRequest.Nickname, Email)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Can't update the nickname"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "The nickname has been updated"})
}
