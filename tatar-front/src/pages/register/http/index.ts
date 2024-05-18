import axios from "axios";

export const createUser = async (input: RegisterData) => {
  try {
    const response = await axios.post(
      "http://localhost:8090/v1/user_create",
      {
        email: input.email,
        name: input.nickname,
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
    return {success: false, error: error};
  }
};
