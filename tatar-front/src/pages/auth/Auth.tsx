import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { LoginLayout } from "../../components/LoginLayout";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./http";
import { setAuthTokenCookie } from "../../utils/func";

const Auth = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<AuthData>({ email: "", password: "" });

  const handleSubmitEvent = async (e: any) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      try {
        const response = await loginUser(input);

        if (response.success) {
          setAuthTokenCookie(response.data);
          navigate("/")

        } else {
          alert("Ошибка: " + response.error);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Что-то не так");
    }
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <LoginLayout>
      <div className={styles.authSection}>
        <div className={styles.authSection__block}>
          <h1>Добро пожаловать в TatarLearn</h1>
          <form onSubmit={handleSubmitEvent}>
            <div>
              <input
                type="email"
                placeholder="Эл. почта"
                name="email"
                onChange={handleInput}
              />

              <input
                type="password"
                placeholder="Пароль"
                name="password"
                onChange={handleInput}
              />
              <p>
                <Link to={"/Forgot"}>Забыли пароль?</Link>
              </p>
            </div>

            <button type="submit">Войти</button>
            <p>
              <Link to={"/Register"}>Нет аккаунта?</Link>
            </p>
          </form>
        </div>
      </div>
    </LoginLayout>
  );
};

export { Auth };
