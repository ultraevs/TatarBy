import axios from "axios";

export const getAllCourses = async () => {
  try {
    const response = await axios.get("https://fromshmyaksto52withlove.shmyaks.ru/v1/courses", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};
