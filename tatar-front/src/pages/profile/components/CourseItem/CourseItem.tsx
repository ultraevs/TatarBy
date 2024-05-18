import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";

type Props = {
  progress: string;
};

const CourseItem = ({ progress }: Props) => {
  return (
    <div className={styles.courseItem}>
      <p>Изучено</p>
      <p>{progress}%</p>
      <p>Среди всех курсов</p>
    </div>
  );
};

export { CourseItem };
