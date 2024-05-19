import axios from "axios";

export const getPosts = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8090/v1/courses/`,
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