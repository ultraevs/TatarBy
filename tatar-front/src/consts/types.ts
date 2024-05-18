interface AuthData {
  email: string;
  password: string;
}

interface RegisterData {
  nickname: string;
  email: string;
  password: string;
  checkPassword: string;
}

interface CourseItem {
  id: number;
  courseName: string;
  difficulty: string;
  shortDescription: string;
  description: string;
}

interface LessonItem {
  id: number;
  lessonName: string;
  body: string;
  description: string;
}