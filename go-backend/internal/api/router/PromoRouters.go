package router

import (
	"app/internal/api/controller"
	"app/internal/api/middleware"
	"github.com/gin-gonic/gin"
)

func (router *Router) PromoRoutes(group *gin.RouterGroup) {
	group.POST("/add_new_promo", controller.AddNewPromo)
	group.POST("/redeem_promo", middleware.CookieMiddleware(), controller.RedeemPromo)
}
