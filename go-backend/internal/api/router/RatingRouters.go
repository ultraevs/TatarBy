package router

import (
	"app/internal/api/controller"
	"github.com/gin-gonic/gin"
)

func (router *Router) RatingRoutes(group *gin.RouterGroup) {
	group.POST("/get_user_rating", controller.GetUserRating)
	group.GET("/rating", controller.GetRating)
	group.PUT("/update_user_rating", controller.UpdateUserRating)
}
