package router

import (
	"app/internal/api/controller"
	"app/internal/api/middleware"
	"github.com/gin-gonic/gin"
)

func (router *Router) CompleteLessonsRoutes(group *gin.RouterGroup) {
	group.POST("/AddCompletedLesson", middleware.CookieMiddleware(), controller.AddCompletedLesson)
	group.POST("/GetCompletedLessons", middleware.CookieMiddleware(), controller.GetAllCompletedLessons)
	group.POST("/GetCompletedLessonsByCourse", middleware.CookieMiddleware(), controller.GetCompletedLessonsByCourse)
}
