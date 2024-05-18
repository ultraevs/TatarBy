import axios from "axios";

export const getCourse = async (id: number) => {
  try {
    const response = await axios.get(
      `https://fromshmyaksto52withlove.shmyaks.ru/v1/courses/${id}`,
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

export const getAllLessons = async (id: number) => {
  try {
    const response = await axios.get(
      `https://fromshmyaksto52withlove.shmyaks.ru/v1/courses/${id}/lessons`,
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
