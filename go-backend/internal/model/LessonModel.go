package model

type NullString struct {
	String string `json:"string"`
	Valid  bool   `json:"valid"`
}

type Course struct {
	ID               uint   `json:"id"`
	CourseName       string `json:"courseName"`
	Difficulty       string `json:"difficulty"`
	ShortDescription string `json:"shortDescription"`
	Description      string `json:"description"`
}

type Lesson struct {
	ID          uint   `json:"id"`
	LessonName  string `json:"lessonName"`
	Body        string `json:"body"`
	Description string `json:"description"`
}

type Task struct {
	ID            uint     `json:"id"`
	LessonID      uint     `json:"lessonID"`
	TaskType      string   `json:"taskType"`
	TaskText      string   `json:"taskText"`
	Options       []string `json:"options"`
	AudioPath     string   `json:"audioPath"`
	CorrectAnswer string   `json:"correctAnswer"`
	UserAnswer    string   `json:"userAnswer"`
}
