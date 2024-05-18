import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { StarOutlined } from "@ant-design/icons";
import { getColorByLevel } from "../../../../utils/func";
import { useNavigate } from "react-router-dom";

type Props = {
  item: CourseItem;
};

const CourseItem = ({ item }: Props) => {
  const navigate = useNavigate();

  const courseHandleClick = (id: number) => {
    navigate(`/Course/${id}`)
  }
  return (
    <div className={styles.courseItem} onClick={() => courseHandleClick(item.id)}>
      <div className={styles.courseItem__top}>
        <div className={styles.courseItem__top__level}>
          <div
            style={{
              background: getColorByLevel(item.difficulty).background,
              border: `1px solid ${getColorByLevel(item.difficulty).border}`,
            }}
            className={styles.courseItem__top__level__block}
          >
            <span style={{background: getColorByLevel(item.difficulty).spanBg}}></span>
          </div>
          <p style={{color: getColorByLevel(item.difficulty).color}}>{item.difficulty}</p>
        </div>
        <div className={styles.courseItem__top__star}>
          <StarOutlined />
        </div>
      </div>
      <div className={styles.courseItem__bottom}>
        <p>Курс "{item.courseName}"</p>
      </div>
    </div>
  );
};

export { CourseItem };
