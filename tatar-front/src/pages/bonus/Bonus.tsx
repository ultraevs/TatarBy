import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import classNames from "classnames"
import { MainLayout } from "../../components/MainLayout";
import { BonusLive } from "../../components/BonusLive";

const Bonus = () => {
  return (
    <MainLayout>
      <div className={classNames(styles.bonus, "container")}>
        <BonusLive />
      </div>
    </MainLayout>
  );
};

export { Bonus };
