package router

import (
	"app/internal/api/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Router struct {
	engine *gin.Engine
}

func NewRouter() Router {
	return Router{engine: gin.Default()}
}

func (router *Router) Run(port string) error {
	router.Setup()
	return router.engine.Run(":" + port)
}

func (router *Router) Setup() {
	gin.SetMode(gin.DebugMode)
	router.engine.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://tatarby.shmyaks.ru", "http://localhost:5173", "https://fromshmyaksto52withlove.shmyaks.ru"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
	}))
	router.engine.GET("v1/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.engine.Use(middleware.RateLimiterMiddleware())
	v1 := router.engine.Group("/v1")
	router.AuthRoutes(v1)
	router.ProfileRoutes(v1)
	router.LessonRoutes(v1)
	router.RatingRoutes(v1)
	router.CompleteLessonsRoutes(v1)
	router.PromoRoutes(v1)
}
