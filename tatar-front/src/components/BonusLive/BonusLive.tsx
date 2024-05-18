import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";

import moment from "moment";

const BonusLive = () => {
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

  return (
    <>
      {duration !== null && (
        <div className={styles.bonusLive}>
          <div className={styles.bonusLive__block}>
            <h1>До трансляции с розыгрышем осталось</h1>
            <div>
              {duration.years() !== 0 && <span>{-duration.years()} years{" "}</span>}
              {duration.months() !== 0 && <span>{-duration.months()} months{" "}</span>}
              {duration.days() !== 0 && <span>{-duration.days()} days{" "}</span>}
              {duration.hours() !== 0 && <span>{-duration.hours()} hours{" "}</span>}
              {duration.minutes() !== 0 && <span>{-duration.minutes()} minutes{" "}</span>}
              {duration.seconds() !== 0 && <span>{-duration.seconds()} seconds{" "}</span>}
            </div>
          </div>
          <div className={styles.bonusLive__blur1}></div>
          <div className={styles.bonusLive__blur2}></div>
          <div className={styles.bonusLive__blur3}></div>
        </div>
      )}
    </>
  );
};

export { BonusLive };
