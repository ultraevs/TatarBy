import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import Cookies from "js-cookie";
import TatarByLogo from "../../assets/svg/TatarByLogo.svg";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  const authToken = Cookies.get("Authtoken");
  const navigate = useNavigate();

  const logoClick = () => {
    navigate("/");
    window.scrollTo(0,0)
  };

  const enterButtonClick = () => {
    navigate("/Auth");
  };

  const profileButtonClick = () => {
    navigate("/Profile");
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div onClick={logoClick}>
          <img src={TatarByLogo} alt="TatarBy logo" />
        </div>

        <div className={styles.header__container__links}>
          <nav>
            <Link to={"/"} onClick={logoClick}>Главная</Link>
            <Link to={"/Speaking"}>Произношение</Link>
            <Link to={"/Courses"}>Грамматика</Link>
            <Link to={"/Materials"}>Материалы</Link>
            <Link to={"/DefaultBonus"}>Бонусы</Link>
          </nav>
          {authToken !== undefined ? (
            <button onClick={profileButtonClick}>Профиль</button>
          ) : (
            <button onClick={enterButtonClick}>Войти</button>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
