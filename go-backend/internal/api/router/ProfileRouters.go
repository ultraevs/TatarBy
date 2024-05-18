package router

import (
	"app/internal/api/controller"
	"app/internal/api/middleware"
	"github.com/gin-gonic/gin"
)

func (router *Router) ProfileRoutes(group *gin.RouterGroup) {
	group.GET("/user_info", middleware.CookieMiddleware(), controller.UserInfo)
	group.POST("/user_photo", middleware.CookieMiddleware(), controller.AddUserPhoto)
	group.PUT("/user_nickname", middleware.CookieMiddleware(), controller.AddUserNickname)
}
