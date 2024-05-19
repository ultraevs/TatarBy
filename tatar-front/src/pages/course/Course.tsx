import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../components/MainLayout";
import { getAllLessons, getCourse } from "./http";
import { CourseTitle } from "./components/CourseTitle";
import { setCourseID } from "../../state/slices/currentCourse/currentCourseSlice";

const Course = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const [course, setCourse] = useState<CourseItem | null>(null);
  const [lessons, setLessons] = useState<LessonItem[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const courseResponse = await getCourse(Number(id));
        if (courseResponse.success) {
          setCourse(courseResponse.data);
        }

        const lessonsResponse = await getAllLessons(Number(id));
        if (lessonsResponse.success) {
          setLessons(lessonsResponse.data);
        }
      }
    };

    getData();
  }, []);

  const handleClick = (lessonId: number) => {
    navigate(`/Lesson/${lessonId}`);
    dispatch(setCourseID({id: id}))
  };

  return (
    <MainLayout>
      {course !== null && (
        <div className={styles.course}>
          <div className="container">
            <CourseTitle course={course} />
            <div className={styles.course__content}>
              <div className={styles.course__content__text}>
                <h2>Что мы изучим:</h2>
                <p>{course.description}</p>
              </div>
              <div className={styles.course__content__photo}></div>
            </div>
          </div>
          {lessons !== null && (
            <div className={styles.lessons}>
              {lessons.map((lesson, index) => (
                <div key={lesson.lessonName} className={styles.lessons__item}>
                  <div>
                    <p>
                      {index + 1}. {lesson.lessonName}
                    </p>
                    <button onClick={() => handleClick(lesson.id)}>
                      Перейти
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export { Course };
