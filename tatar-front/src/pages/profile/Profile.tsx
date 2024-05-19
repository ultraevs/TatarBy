import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import classNames from "classnames";
import { MainLayout } from "../../components/MainLayout";
import { getProgress, getRating, getStats, getUserInfo } from "./http";
import { UserInfo } from "./components/UserInfo";
import { CourseItem } from "./components/CourseItem";
import { Progress } from "./components/Progress";
import { UserPoints } from "./components/UserPoints";
import { BonusLink } from "../../components/BonusLink";
import { UserCommercial } from "./components/UserCommercial";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [statsInfo, setStatsInfo] = useState<any>(null);
  const [progressInfo, setProgressInfo] = useState<any>(null);
  const [rating, setRating] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const userInfoResponse = await getUserInfo();
      if (userInfoResponse.success) {
        setUserInfo(userInfoResponse.data);
        const ratingResponse = await getRating(userInfoResponse.data.name);
        if (ratingResponse.success) {
          setRating(ratingResponse.data);
        }
      }

      const progressResponse = await getProgress();
      if (progressResponse.success) {
        setProgressInfo(progressResponse.data);
      }

      const statsResponse = await getStats();
      if (statsResponse.success) {
        setStatsInfo(statsResponse?.data);
      }
    };

    getData();
  }, []);

  return (
    <MainLayout>
      <div className={classNames(styles.profile, "container")}>
        <UserInfo item={userInfo} />
        <div className={styles.profile__activity}>
          <h4 className="subtitle">Активность</h4>
          <div className={styles.profile__activity__items}>
            <CourseItem
              progress={
                progressInfo && progressInfo["completion_percentage"].toFixed(0)
              }
            />
            <UserPoints points={rating?.score} />
            <BonusLink />
          </div>
        </div>
        <div className={styles.profile__results}>
          <h4 className="subtitle">Результаты тестов</h4>
          <div className={styles.profile__results__items}>
            {userInfo !== null && <UserCommercial refLink={userInfo.referal} />}
            {statsInfo !== null && <Progress items={statsInfo.slice(0, 4)} />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export { Profile };
