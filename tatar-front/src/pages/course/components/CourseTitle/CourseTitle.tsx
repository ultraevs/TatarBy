import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { getColorByLevel } from "../../../../utils/func";

type Props = {
  course: CourseItem;
};

const CourseTitle = ({ course }: Props) => {
  return (
    <div className={styles.courseTitle}>
      <div className={styles.courseTitle__block}>
        <h1>Курс "{course.courseName}"</h1>
        <p>{course.shortDescription}</p>
      </div>
      <div
        className={styles.courseTitle__blur1}
        style={{ background: getColorByLevel(course.difficulty).color }}
      ></div>
      <div
        className={styles.courseTitle__blur2}
        style={{ background: getColorByLevel(course.difficulty).color }}
      ></div>
      <div
        className={styles.courseTitle__blur3}
        style={{ background: getColorByLevel(course.difficulty).color }}
      ></div>
    </div>
  );
};

export { CourseTitle };
