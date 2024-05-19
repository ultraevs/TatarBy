import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MainLayout } from "../../components/MainLayout";
import { RootState } from "../../state/store";
import stars from "../../assets/svg/stars.svg";
import frown from "../../assets/svg/frown.svg";
import { setCourseID } from "../../state/slices/currentCourse/currentCourseSlice";

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseID } = useSelector((store: RootState) => store.course);
  const { progress, amount } = useSelector(
    (store: RootState) => store.taskList
  );

  const handleClick = () => {
    navigate(`/Course/${courseID}`);
    dispatch(setCourseID({ id: null }));
  };
  return (
    <MainLayout>
      <div className={classNames(styles.result, "container")}>
        <h1>Название курса</h1>
        <div className={styles.result__content}>
          <div className={styles.result__content__block}>
            <p>
              {progress}/{amount}
            </p>
            <button onClick={handleClick}>Вернуться к курсу</button>
          </div>
          <div className={styles.result__content__blur1}>
            <img
              src={Math.round(progress / amount) * 0.1 > 0.5 ? stars : frown}
              alt="result effect"
            />
          </div>
          <div className={styles.result__content__blur2}>
            <img
              src={Math.round(progress / amount) * 0.1 > 0.5 ? stars : frown}
              alt="result effect"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export { Result };
