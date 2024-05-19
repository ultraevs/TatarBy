import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import classNames from "classnames";
import { MainLayout } from "../../components/MainLayout";
import { useParams } from "react-router-dom";
import { getTasksList } from "./http";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setCurrentItems } from "../../state/slices/currentTasks/currentTasksSlice";
import { QuizItem } from "../../components/QuizItem/QuizItem";

const Test = () => {
  const dispatch = useDispatch<AppDispatch>();
  let { id } = useParams();
  const { currentItem } = useSelector((store: RootState) => store.taskList);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const taskResponse = await getTasksList(Number(id));
        if (taskResponse.success) {
          dispatch(setCurrentItems({ items: taskResponse.data }));
        }
      }
    };

    getData();
  }, []);

  return (
    <MainLayout>
      <div className={classNames(styles.test, "container")}>
        {currentItem !== null && id !== undefined && (
          <QuizItem id={id} item={currentItem} />
        )}
      </div>
    </MainLayout>
  );
};

export { Test };
