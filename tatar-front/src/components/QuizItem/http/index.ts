import axios from "axios";

export const addCompletedLesson = async (
  courseID: any,
  lessonID: string,
  score: number
) => {
  try {
    const response = await axios.post(
      "http://localhost:8090/v1/AddCompletedLesson",
      {
        courseId: courseID,
        lessonId: lessonID,
        score: score,
      },
      {
        withCredentials: true,
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get("http://localhost:8090/v1/user_info", {
      withCredentials: true,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const updateUserRaiting = async (nickname: string, score: number) => {
  try {
    const response = await axios.put(
      "http://localhost:8090/v1/update_user_rating",
      {
        nickname: nickname,
        score: score,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};
