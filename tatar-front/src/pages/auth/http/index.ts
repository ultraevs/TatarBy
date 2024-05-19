import axios from "axios";

export const loginUser = async (input: AuthData) => {
  try {
    const response = await axios.post(
      "https://tatarby.shmyaks.ru/v1/login",
      {
        email: input.email,
        password: input.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { success: true, data: response.data.token };
  } catch (error) {
    return { success: false, error: error };
  }
};
