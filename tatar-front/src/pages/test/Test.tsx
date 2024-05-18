import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import classNames from "classnames";
import { MainLayout } from "../../components/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { getTasksList } from "./http";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
  setCurrentItem,
  setCurrentItems,
} from "../../state/slices/currentTasks/currentTasksSlice";
import { QuizItem } from "../../components/QuizItem/QuizItem";
import { Quiz } from "../../components/Quiz";

const Test = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  let { id } = useParams<{ id: string }>();
  const { items, currentItem, currentIndex, amount, progress } = useSelector(
    (store: RootState) => store.taskList
  );

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

  console.log(items, currentItem, currentIndex, amount, progress);

  const handleClick = () => {
    if (currentIndex + 1 < amount) {
      dispatch(setCurrentItem({item: items[currentIndex + 1], progress: 1}));
    } else {
      navigator(`/Task${id}/Result`);
    }
  };

  return (
    <MainLayout>
      <div className={classNames(styles.test, "container")}>
        {currentItem !== null && <QuizItem item={currentItem} onClick={handleClick} />}
      </div>
    </MainLayout>
  );
};

export { Test };
