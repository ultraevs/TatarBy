import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import SearchLoop from "../../../../assets/svg/SearchLoop.svg";

type Props = {
  onChange: React.ChangeEventHandler;
  query: string;
};

const Searchloop = ({ onChange, query }: Props) => {
  return (
    <div className={styles.searchLoop}>
      <div className={styles.searchLoop__block}>
        <h1>Изучайте язык через курсы.</h1>
        <p>
          Мы создали несколько курсов с видеоуроками, аудиозаписями и тестами.
          Так вы будете лучше прогрессировать.
        </p>
        <div className={styles.searchLoop__block__search}>
          <img src={SearchLoop} alt="search loop" />
          <input
            type="text"
            placeholder="Поиск по курсам..."
            value={query}
            onChange={onChange}
          />
        </div>
      </div>
      <div className={styles.searchLoop__blur1}></div>
      <div className={styles.searchLoop__blur2}></div>
      <div className={styles.searchLoop__blur3}></div>
    </div>
  );
};

export { Searchloop };
