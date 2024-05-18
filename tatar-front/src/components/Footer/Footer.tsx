import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import logo from "./../../assets/svg/LogoFooter.svg";
import tg from "./../../assets/svg/tg.svg";

const Footer = () => {
  const navigate = useNavigate()
  const logoClick = () => {
    navigate("/");
    window.scrollTo(0,0)
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__logo} onClick={logoClick}>
        <img src={logo} alt="" />
        <p>TatarLearn, 2024</p>
      </div>
      <div className={styles.footer__tg}>
        <img src={tg} alt="" />
        <a href="https://t.me/tatarlearn">@tatarlearn</a>
      </div>
    </footer>
  );
};

export { Footer };
