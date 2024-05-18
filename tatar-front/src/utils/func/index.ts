import Cookies from "js-cookie";

export const setAuthTokenCookie = (token: string) => {
  Cookies.set("Authtoken", token, { expires: 7 });
};

export const getColorByLevel = (difficulty: string) => {
  switch (difficulty) {
    case "Легкий":
      return {
        color: "#65A52B",
        background: "rgba(148, 220, 32, 0.3)",
        border: "rgba(90, 155, 24, 0.5)",
        spanBg: "rgba(115, 220, 32, 0.5)",
      };
    case "Средний":
      return {
        color: "#9FA52B",
        background: "rgba(193, 220, 32, 0.3)",
        border: "rgba(155, 150, 24, 0.5)",
        spanBg: "rgba(216, 220, 32, 0.5)",
      };
    case "Сложный":
      return {
        color: "#F84848",
        background: "rgba(220, 32, 32, 0.3)",
        border: "rgba(155, 24, 24, 0.5)",
        spanBg: "rgba(220, 32, 32, 0.5)",
      };
    default:
      return {
        color: "#65A52B",
        background: "rgba(148, 220, 32, 0.3)",
        border: "rgba(90, 155, 24, 0.5)",
        spanBg: "rgba(115, 220, 32, 0.5)",
      };
  }
};

export const getColorByStat = (stat: number) => {
  switch (stat) {
    case 1:
      return { color: "#D7CB74" };
    case 2:
      return { color: "#E8E8E8" };
    case 3:
      return { color: "#8D4821" };
    default:
      return { color: "#ffffff" };
  }
};
