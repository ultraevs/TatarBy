import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";

import moment from "moment";
import lock from "../../assets/svg/lock.svg";
import { useNavigate } from "react-router-dom";

const BonusLink = () => {
  const navigate = useNavigate()
  const [duration, setDuration] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = moment();
      const targetDate = moment("2024-05-25");
      const newDuration = moment.duration(currentDate.diff(targetDate));
      setDuration(newDuration);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!duration) {
    return null;
  }

  const toBonus = () => {
    navigate("/Bonus")
  }

  return (
    <div className={styles.bonusLink}>
      <div className={styles.bonusLink__top}>
        <p>
          Поднимитесь выше 50 строчки нашего рейтинга, чтобы принять участие в
          розыгрыше
        </p>
      </div>
      <div className={styles.bonusLink__content}>
        <div className={styles.bonusLink__content__time} onClick={toBonus}>
          Осталось{" "}
          {duration.years() !== 0 && <span>{-duration.years()} years </span>}
          {duration.months() !== 0 && <span>{-duration.months()} months </span>}
          {duration.days() !== 0 && <span>{-duration.days()} days </span>}
          {duration.hours() !== 0 && <span>{-duration.hours()} hours </span>}
          {duration.minutes() !== 0 && (
            <span>{-duration.minutes()} minutes </span>
          )}
        </div>
        <div className={styles.bonusLink__content__submit}>
          {duration && duration["_milliseconds"] < 0 ? (
            <img src={lock} alt="lock" />
          ) : (
            <p>Перейти</p>
          )}
        </div>
      </div>
    </div>
  );
};

export { BonusLink };
