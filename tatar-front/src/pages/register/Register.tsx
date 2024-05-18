import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { LoginLayout } from "../../components/LoginLayout";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "./http";
import { setAuthTokenCookie } from "../../utils/func";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<RegisterData>({
    nickname: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  const handleSubmitEvent = async (e: any) => {
    e.preventDefault();
    if (
      input.nickname !== "" &&
      input.email !== "" &&
      input.password !== "" &&
      input.checkPassword !== "" &&
      input.password === input.checkPassword
    ) {
      try {
        const response = await createUser(input);

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

  const clearInputs = () => {
    setInput({
      nickname: "",
      email: "",
      password: "",
      checkPassword: "",
    });
  };

  return (
    <LoginLayout>
      <div className={styles.registerSection}>
        <div className={styles.registerSection__block}>
          <h1>Добро пожаловать в TatarLearn</h1>
          <form onSubmit={handleSubmitEvent}>
            <div>
              <input
                type="text"
                placeholder="Никнейм"
                name="nickname"
                onChange={handleInput}
              />
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
              <input
                type="password"
                placeholder="Подтвердите пароль"
                name="checkPassword"
                onChange={handleInput}
              />
              <p>
                Уже есть аккаунт? <Link to={"/Auth"}>Войти</Link>
              </p>
            </div>
            <button type="submit">Зарегистрироваться</button>
          </form>
        </div>
      </div>
    </LoginLayout>
  );
};

export { Register };
