package model

type CompleteLesson struct {
	CourseID int `json:"courseId"`
	LessonID int `json:"lessonId"`
	Score    int `json:"score"`
}
