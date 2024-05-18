import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { AudioWaveForm } from "../AudioWaveForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setCurrentItem } from "../../state/slices/currentTasks/currentTasksSlice";
import { useNavigate } from "react-router-dom";
import { addCompletedLesson, getUserInfo, updateUserRaiting } from "./http";

type Props = {
  id: string;
  item: any;
};

const QuizItem = ({ id, item }: Props) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { courseID } = useSelector((store: RootState) => store.course);
  const [selectedInput, setSelectedInput] = useState<any>(null);
  const { items, currentIndex, progress, amount } = useSelector(
    (store: RootState) => store.taskList
  );

  const handleClick = async () => {
    const progressValue =
      item.options[selectedInput] === item.correctAnswer ? 1 : 0;
    if (currentIndex + 1 < amount) {
      dispatch(
        setCurrentItem({
          item: items[currentIndex + 1],
          progress: progressValue,
        })
      );
    } else {
      dispatch(
        setCurrentItem({
          item: items[currentIndex + 1],
          progress: progressValue,
        })
      );
      addCompletedLesson(Number(courseID), item.lessonID, progressValue);
      const userInfoResponse = await getUserInfo();
      if (userInfoResponse.success) {
        updateUserRaiting(userInfoResponse.data.name, progress + progressValue);
      }
      navigator(`/Test/${id}/Result`);
    }
    setSelectedInput(null);
  };

  console.log(currentIndex + 1, amount);
  return (
    currentIndex < amount && (
      <div className={styles.quizItem}>
        <div className={styles.quizItem__title}>
          <p>
            {item.taskType === "text" ? item.taskText : "Прослушайте аудио"}
          </p>
        </div>
        <div className={styles.quizItem__content}>
          <div className={styles.quizItem__content__items}>
            {item.options.map((answer: any, index: number) => (
              <div key={answer} className={styles.quizItem__content__item}>
                <p>{answer}</p>
                <input
                  type="checkbox"
                  value={answer}
                  checked={selectedInput === index}
                  onChange={() => setSelectedInput(index)}
                />
              </div>
            ))}
          </div>
          <div className={styles.quizItem__content__progress}>
            {item.taskType === "text" ? (
              <div></div>
            ) : (
              <AudioWaveForm url={item.audioPath} />
            )}
            <div className={styles.quizItem__content__progress__submit}>
              <button
                onClick={selectedInput !== null ? handleClick : undefined}
              >
                Ответить
              </button>
              <p>
                {currentIndex + 1}/{amount}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export { QuizItem };
