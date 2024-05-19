import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import classnames from "classnames";
import { MainLayout } from "../../components/MainLayout";
import { Searchloop } from "./components/SearchLoop";
import { CourseItem } from "./components/CourseItem";
import { getAllCourses } from "./http";

const Speaking = () => {
  const [courses, setCourses] = useState<CourseItem[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const coursesResponse = await getAllCourses();
      if (coursesResponse.success) {
        setCourses(coursesResponse.data);
      }
    };

    getData();
  }, []);

  const filteredItems: CourseItem | CourseItem[] = courses
    ? courses.filter((item) => {
        return item.courseName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      })
    : [];

  return (
    <MainLayout>
      {courses !== null && (
        <div className={classnames(styles.courses, "container")}>
          <div className={styles.courses__loop}>
            <Searchloop onChange={onQueryChange} query={searchQuery} />
          </div>
          <div className={styles.courses__items}>
            {filteredItems.map((item) => (
              <CourseItem key={item.courseName} item={item} />
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export { Speaking };
