import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";

type Props = {
  points: number;
};

const UserPoints = ({ points }: Props) => {
  return (
    <div className={styles.userPoints}>
      <p>Ваши баллы</p>
      <p>{points}</p>
    </div>
  );
};

export { UserPoints };
