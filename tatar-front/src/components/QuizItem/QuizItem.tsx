import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { AudioWaveForm } from "../AudioWaveForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setCurrentItem } from "../../state/slices/currentTasks/currentTasksSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  item: any;
};

const QuizItem = ({ id, item }: Props) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [selectedInput, setSelectedInput] = useState<any>(null);
  const { items, currentIndex, amount } = useSelector(
    (store: RootState) => store.taskList
  );

  const handleClick = () => {
    const progressValue = {
      [item.options[selectedInput] === item.correctAnswer ? 1 : 0]: true,
    };
    if (selectedInput + 1 < amount) {
      dispatch(
        setCurrentItem({
          item: items[currentIndex + 1],
          progress: progressValue,
        })
      );
    } else {
      navigator(`/Task${id}/Result`);
    }
    setSelectedInput(null)
  };

  return (
    <div className={styles.quizItem}>
      <div className={styles.quizItem__title}>
        <p>
          {item.taskType === "text"
            ? item.taskText.String
            : "Прослушайте аудио"}
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
          {item.taskType === "text" ? <div></div> : <AudioWaveForm />}
          <div className={styles.quizItem__content__progress__submit}>
            <button onClick={handleClick}>Ответить</button>
            <p>
              {currentIndex + 1}/{amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { QuizItem };
