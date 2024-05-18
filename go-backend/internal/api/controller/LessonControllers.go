package controller

import (
	"app/internal/database"
	"app/internal/model"
	"database/sql"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
	"net/http"
	"strconv"
)

// GetCourses Получить все курсы.
// @Summary Получить все курсы
// @Description Получает список всех курсов
// @Accept json
// @Produce json
// @Success 200 {array} model.Lesson "Список курсов"
// @Failure 500 {object} model.ErrorResponse "Не удалось получить курсы"
// @Tags Courses
// @Router /v1/courses [get]
func GetCourses(context *gin.Context) {
	rows, err := database.Db.Query("SELECT courseid, coursename, shortdescription, description, difficulty FROM tatarby_courses")
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {

		}
	}(rows)

	var courses []model.Course
	for rows.Next() {
		var course model.Course
		err := rows.Scan(&course.ID, &course.CourseName, &course.ShortDescription, &course.Description, &course.Difficulty)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		courses = append(courses, course)
	}

	context.JSON(http.StatusOK, courses)
}

// GetCourseByID Получить курс.
// @Summary Получить курс
// @Description Получает курс по указанному id
// @Accept json
// @Produce json
// @Param courseID path int true "ID курса"
// @Success 200 {array} model.Lesson "Курс по его id"
// @Failure 400 {object} model.ErrorResponse "Неверный ID курса"
// @Failure 500 {object} model.ErrorResponse "Не удалось получить курс"
// @Tags Courses
// @Router /v1/courses/{courseID} [get]
func GetCourseByID(context *gin.Context) {
	courseId, err := strconv.Atoi(context.Param("courseID"))
	Course := model.Course{}

	err = database.Db.QueryRow("SELECT coursename, shortdescription, description, difficulty FROM tatarby_courses WHERE courseid = $1", courseId).Scan(&Course.CourseName, &Course.ShortDescription, &Course.Description, &Course.Difficulty)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			context.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		} else {
			fmt.Println(err)
			context.JSON(http.StatusInternalServerError, gin.H{"error": "Error with DB"})
		}
		return
	}
	context.JSON(http.StatusOK, Course)
}

// GetTasksByLessonID Получить задания для урока.
// @Summary Получить задания для урока
// @Description Получает список заданий для определенного урока
// @Accept json
// @Produce json
// @Param lessonID path int true "ID урока"
// @Success 200 {array} model.Task "Список заданий"
// @Failure 400 {object} model.ErrorResponse "Неверный ID урока"
// @Failure 500 {object} model.ErrorResponse "Не удалось получить задания"
// @Tags Tasks
// @Router /v1/lessons/{lessonID}/tasks [get]
func GetTasksByLessonID(context *gin.Context) {
	lessonID, err := strconv.Atoi(context.Param("lessonID"))
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid lesson ID"})
		return
	}

	rows, err := database.Db.Query("SELECT taskid, lessonid, tasktype, tasktext, options, audiopath, correctanswer FROM tatarby_tasks WHERE lessonid = $1", lessonID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			fmt.Println("Error closing rows:", err)
		}
	}(rows)

	var tasks []model.Task
	for rows.Next() {
		var task model.Task
		var options []sql.NullString
		var audioPath sql.NullString

		err := rows.Scan(&task.ID, &task.LessonID, &task.TaskType, &task.TaskText, pq.Array(&options), &audioPath, &task.CorrectAnswer)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		task.AudioPath = ""
		if audioPath.Valid {
			task.AudioPath = audioPath.String
		}

		for _, option := range options {
			if option.Valid {
				task.Options = append(task.Options, option.String)
			} else {
				task.Options = append(task.Options, "")
			}
		}

		tasks = append(tasks, task)
	}

	context.JSON(http.StatusOK, tasks)
}

// GetLessonsByCourseID Получить уроки для курса.
// @Summary Получить уроки для курса
// @Description Получает список уроков для определенного курса
// @Accept json
// @Produce json
// @Param courseID path int true "ID курса"
// @Success 200 {array} model.Task "Список уроков"
// @Failure 400 {object} model.ErrorResponse "Неверный ID курса"
// @Failure 500 {object} model.ErrorResponse "Не удалось получить уроки"
// @Tags Tasks
// @Router /v1/courses/{courseID}/lessons [get]
func GetLessonsByCourseID(context *gin.Context) {
	courseIDStr := context.Param("courseID")

	courseID, err := strconv.Atoi(courseIDStr)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Неверный ID курса"})
		return
	}

	query := `SELECT lessonid, lessonname, lessondescription, body 
	          FROM tatarby_lessons 
	          WHERE courseid = $1`
	rows, err := database.Db.Query(query, courseID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
		}
	}(rows)

	var lessons []model.Lesson
	for rows.Next() {
		var lesson model.Lesson
		err := rows.Scan(&lesson.ID, &lesson.LessonName, &lesson.Description, &lesson.Body)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		lessons = append(lessons, lesson)
	}

	context.JSON(http.StatusOK, lessons)
}

// GetLessonsByID Получить урок.
// @Summary Получить урок
// @Description Получает урок по указанному id
// @Accept json
// @Produce json
// @Param lessonID path int true "ID урока"
// @Success 200 {array} model.Lesson "Урок по его id"
// @Failure 400 {object} model.ErrorResponse "Неверный ID урока"
// @Failure 500 {object} model.ErrorResponse "Не удалось получить урок"
// @Tags Lessons
// @Router /v1/lessons/{lessonID} [get]
func GetLessonsByID(context *gin.Context) {
	lessonsId, err := strconv.Atoi(context.Param("lessonID"))
	Lesson := model.Lesson{}

	err = database.Db.QueryRow("SELECT lessonid, lessonname, lessondescription, body FROM tatarby_lessons WHERE lessonid = $1", lessonsId).Scan(&Lesson.ID, &Lesson.LessonName, &Lesson.Description, &Lesson.Body)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			context.JSON(http.StatusNotFound, gin.H{"error": "Lesson not found"})
		} else {
			fmt.Println(err)
			context.JSON(http.StatusInternalServerError, gin.H{"error": "Error with DB"})
		}
		return
	}
	context.JSON(http.StatusOK, Lesson)
}
