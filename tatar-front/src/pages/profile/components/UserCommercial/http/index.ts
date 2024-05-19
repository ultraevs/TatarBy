import axios from "axios";

export const givePromo = async (promo: string) => {
  try {
    const response = await axios.post(
      "https://tatarby.shmyaks.ru/v1/redeem_promo",
      {
        promo_code: promo,
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
