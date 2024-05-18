package controller

import (
	"app/internal/database"
	"app/internal/model"
	"database/sql"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

// AddCompletedLesson Добавить пройденный урок.
// @Summary Добавить пройденный урок в прогресс юзера
// @Description Добавляет новый урок в список уроков юзера
// @Accept json
// @Produce json
// @Param request body model.CompleteLesson true "Запрос на добавление пройденного урока"
// @Success 200 {array} model.Lesson "Урок добавлен"
// @Failure 500 {object} model.ErrorResponse "Не удалось добавить уроки"
// @Tags Lessons
// @Router /v1/AddCompletedLesson [post]
func AddCompletedLesson(context *gin.Context) {
	var completeLesson model.CompleteLesson
	if context.Bind(&completeLesson) != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}
	var userID int
	Email := context.MustGet("Email").(string)
	err := database.Db.QueryRow("SELECT id FROM tatarby_users WHERE email = $1", Email).Scan(&userID)
	if err != nil {
		return
	}

	_, err = database.Db.Exec("INSERT INTO tatarby_completed_lessons (user_id, course_id, lesson_id, score) VALUES ($1, $2, $3, $4)", userID, completeLesson.CourseID, completeLesson.LessonID, completeLesson.Score)
	if err != nil {
		return
	}

	context.JSON(http.StatusOK, gin.H{"result": "success"})
}

// GetAllCompletedLessons Получить пройденные уроки юзера.
// @Summary Получить пройденные уроки юзера
// @Description Возвращает все пройденные юзером уроки
// @Accept json
// @Produce json
// @Success 200 {array} model.Lesson "Уроки получены"
// @Failure 400 {object} model.ErrorResponse "Не удалось найти юзера"
// @Failure 500 {object} model.ErrorResponse "Не удалось получить уроки"
// @Tags Lessons
// @Router /v1/GetCompletedLessons [post]
func GetAllCompletedLessons(context *gin.Context) {
	Email := context.MustGet("Email").(string)

	var userID int
	err := database.Db.QueryRow("SELECT id FROM tatarby_users WHERE email = $1", Email).Scan(&userID)
	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": "No user"})
		return
	}

	rows, err := database.Db.Query("SELECT lesson_id FROM tatarby_completed_lessons WHERE user_id = $1", userID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {

		}
	}(rows)

	var completedLessons []string
	for rows.Next() {
		var lessonID int
		err := rows.Scan(&lessonID)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": "Processing error"})
			return
		}
		completedLessons = append(completedLessons, strconv.Itoa(lessonID))
	}

	var totalLessons int
	err = database.Db.QueryRow("SELECT COUNT(*) FROM tatarby_lessons").Scan(&totalLessons)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	completionPercentage := 0.0
	if totalLessons > 0 {
		completionPercentage = (float64(len(completedLessons)) / float64(totalLessons)) * 100
	}

	context.JSON(http.StatusOK, gin.H{
		"lessons":               completedLessons,
		"completion_percentage": completionPercentage,
	})
}

// GetCompletedLessonsByCourse Получить пройденные уроки юзера по нужному курсу.
// @Summary Получить пройденные уроки юзера в конкретном курсе
// @Description Возвращает все пройденные юзером уроки в указанном курсе
// @Accept json
// @Produce json
// @Param CourseID path int true "ID курса"
// @Success 200 {array} model.Lesson "Уроки получены"
// @Failure 400 {object} model.ErrorResponse "Не удалось найти юзера"
// @Failure 500 {object} model.ErrorResponse "Не удалось получить уроки"
// @Tags Lessons
// @Router /v1/GetCompletedLessonsByCourse [post]
func GetCompletedLessonsByCourse(context *gin.Context) {
	Email := context.MustGet("Email").(string)
	CourseID, _ := strconv.Atoi(context.PostForm("CourseID"))

	var userID int
	err := database.Db.QueryRow("SELECT id FROM tatarby_users WHERE email = $1", Email).Scan(&userID)
	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"error": "No user"})
		return
	}

	rows, err := database.Db.Query("SELECT lesson_id FROM tatarby_completed_lessons WHERE user_id = $1 AND course_id = $2", userID, CourseID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {

		}
	}(rows)

	var lessons []string
	for rows.Next() {
		var lessonID int
		err := rows.Scan(&lessonID)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": "Processing error"})
			return
		}
		lessons = append(lessons, strconv.Itoa(lessonID))
	}

	context.JSON(http.StatusOK, gin.H{"lessons": lessons})
}
