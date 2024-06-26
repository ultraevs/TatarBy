import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
React;
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import { getLesson, getTaskStatus } from "./http";
import { MainLayout } from "../../components/MainLayout";
import { alphaBet } from "../../utils/MockData";
import frame2 from "../../assets/png/frame2.png"
import frame3 from "../../assets/png/frame3.png"
import frame4 from "../../assets/png/frame4.png"
import frame5 from "../../assets/png/frame5.png"
import frame6 from "../../assets/png/frame6.png"
import frame7 from "../../assets/png/frame7.png"
import frame8 from "../../assets/png/frame8.png"
import frame9 from "../../assets/png/frame9.png"


const LetterAudio = ({
  letter,
  audioUrl,
}: {
  letter: string;
  audioUrl: string;
}) => {
  const playSound = async () => {
    const audio = new Audio(audioUrl);
    try {
      await audio.play();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.lesson__content__static__item} onClick={playSound}>
      <span>{letter}</span>
    </div>
  );
};

interface LessonItem {
  id: number;
  lessonName: string;
  description: string;
  body: string;
}

const Lesson = () => {
  const lettersWithAudio = Object.entries(alphaBet).map(
    ([letter, audioUrl]) => {
      return <LetterAudio key={letter} letter={letter} audioUrl={audioUrl} />;
    }
  );

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<LessonItem | null>(null);
  const [statusCheck, setStatusCheck] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const lessonResponse = await getLesson(Number(id));
        if (lessonResponse.success) {
          setLesson(lessonResponse.data);
        }

        const taskStatusResponse = await getTaskStatus(Number(id));
        if (taskStatusResponse.success) {
          setStatusCheck(taskStatusResponse.data);
        }
      }
    };

    getData();
  }, []);

  const testHandleCLick = () => {
    navigate(`/Test/${id}`)
  }

  const frames = [frame2, frame3, frame4, frame5, frame6, frame7, frame8, frame9]

  return (
    <MainLayout>
      {lesson !== null && (
        <div className={classNames(styles.lesson, "container")}>
          <div className={styles.lesson__content}>
            <div className={styles.lesson__content__text}>
              <h1>{lesson.lessonName}</h1>
              <p>{lesson.description}</p>
              <h2>Материал</h2>
              <p>{lesson.body}</p>
            </div>
            <div className={classNames({ [styles.lesson__content__static]: lesson.id === 1 })}>
              {lesson.id === 1 ? (
                <>
                  {lettersWithAudio}
                  <div className={styles.lesson__content__static__blur1}></div>
                  <div className={styles.lesson__content__static__blur2}></div>
                  <div className={styles.lesson__content__static__blur3}></div>
                </>
              ) : (
                <img src={frames[lesson.id - 2]} alt="" width={"470px"} height={"528px"}/>
              )}
            </div>
          </div>
          <div className={styles.lesson__test}>
            <div className={styles.lesson__test__info}>
              <button onClick={testHandleCLick}>Перейти к тесту</button>
              <div className={styles.lesson__test__info__result}>
                <p>Результат теста:</p>
                <span>
                  {statusCheck !== null && statusCheck.lessons !== null
                    ? "10/10"
                    : "Вы еще не прошли тест"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export { Lesson };
