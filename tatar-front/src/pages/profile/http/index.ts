import axios from "axios";

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

export const getProgress = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8090/v1/GetCompletedLessons",
      {
        withCredentials: true,
      }
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const getStats = async () => {
  try {
    const response = await axios.get(
      "https://tatarby.shmyaks.ru/v1/rating",
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

export const getRating = async (nickname: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8090/v1/get_user_rating",
      {
        nickname: nickname,
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
