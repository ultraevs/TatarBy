import axios from "axios";

export const getLesson = async (id: number) => {
  try {
    const response = await axios.get(
      `https://tatarby.shmyaks.ru/v1/lessons/${id}`,
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

export const getTaskStatus = async (id: number) => {
  try {
    const response = await axios.post(
      "http://localhost:8090/v1/GetCompletedLessonsByCourse",
      {
        CourseID: id,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};
