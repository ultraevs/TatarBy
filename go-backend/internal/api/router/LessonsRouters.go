package router

import (
	"app/internal/api/controller"
	"github.com/gin-gonic/gin"
)

func (router *Router) LessonRoutes(group *gin.RouterGroup) {
	group.GET("/courses", controller.GetCourses)
	group.GET("/lessons/:lessonID/tasks", controller.GetTasksByLessonID)
	group.GET("/courses/:courseID/lessons", controller.GetLessonsByCourseID)
	group.GET("/courses/:courseID", controller.GetCourseByID)
	group.GET("/lessons/:lessonID", controller.GetLessonsByID)
}
