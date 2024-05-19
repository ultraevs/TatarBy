import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";

import checkProfile from "../../../../assets/svg/checkProfile.svg";
import copyProfile from "../../../../assets/svg/copy.svg";
import { givePromo } from "./http";
import { useNavigate } from "react-router-dom";

type Props = {
  refLink: string;
};

const UserCommercial = ({ refLink }: Props) => {
  const navigate = useNavigate();
  const [input, setInput] = useState<any>(null);

  const handleClick = () => {
    givePromo(input);
    window.location.reload();
  };

  const toBonus = () => {
    navigate("/DefaultBonus")
  }
  return (
    <div className={styles.userCommercial}>
      <div className={styles.userCommercial__promo}>
        <input
          type="text"
          placeholder="Промокод"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleClick}>
          <img src={checkProfile} alt="check" />
        </button>
      </div>
      <div className={styles.userCommercial__ref}>
        <div>
          <p>{refLink}</p>
        </div>
        <button>
          <img src={copyProfile} alt="copy" />
        </button>
      </div>
      <div className={styles.userCommercial__link}>
        <button onClick={toBonus}>
          <span>Бонусная программа</span>
        </button>
      </div>
    </div>
  );
};

export { UserCommercial };
