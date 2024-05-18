import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import classNames from "classnames"
import { MainLayout } from "../../components/MainLayout";
import { BonusLive } from "../../components/BonusLive";
import { Partners } from "../../components/Partners";

import yandex from "../../assets/svg/Yandex.svg"
import litres from "../../assets/png/litres.png"
import chitai from "../../assets/png/chitay_gorod.png"


const Bonus = () => {
  return (
    <MainLayout>
      <div className={classNames(styles.bonus, "container")}>
        <BonusLive />
        <p>При поддержке</p>
        <div className={styles.bonus__partners}>
          <Partners discount={""} description={""} points={""} imageSrc={yandex} left={112} bottom={141.5} />
          <Partners discount={""} description={""} points={""} imageSrc={litres} left={66.5} bottom={114} />
          <Partners discount={""} description={""} points={""} imageSrc={chitai} left={75} bottom={125} />
        </div>
      </div>
    </MainLayout>
  );
};

export { Bonus };
