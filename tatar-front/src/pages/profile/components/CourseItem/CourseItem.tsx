import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  progress: string;
};

const CourseItem = ({ progress }: Props) => {
  return (
    <div className={styles.courseItem}>
      <div style={{ width: 164, height: 164 }}>
        <CircularProgressbar
          value={progress}
          text={progress + "%"}
          styles={buildStyles({
            trailColor: 'rgba(255, 255, 255, 0.15);',
            pathColor: `grey`,
            textColor: "#fff",
          })}
        />
      </div>
    </div>
  );
};

export { CourseItem };
