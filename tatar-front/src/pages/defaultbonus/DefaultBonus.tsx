import React from "react";
// eslint-disable-next-line no-unused-vars
React;
import afisha from "../../assets/png/Yandex_Afisha.png"
import litres from "../../assets/png/litres.png"
import chitai from "../../assets/png/chitay_gorod.png"

import styles from "./styles.module.scss";
import classNames from "classnames"
import { MainLayout } from "../../components/MainLayout";
import { Discounts } from "../../components/Discounts";
import { Partners } from "../../components/Partners";

const DefaultBonus = () => {
  const handelClick = () =>{
    alert("Hello")
  }
  return (
    <MainLayout>
      <div className={classNames(styles.defaultbonus, "container")}>
        <Discounts />
        <div className={styles.defaultbonus__partners}>
          <div onClick={handelClick} >
            <Partners discount="Скидка 10%" description="Любой отечественный фильм на татарском языке" points="50 баллов" imageSrc={afisha} left={200} bottom={100} />
          </div>
          <Partners discount="Скидка 7%" description="Книга на татарском языке" points="30 баллов" imageSrc={litres} left={130} bottom={40} />
          <Partners discount="Скидка 5%" description="Комикс на татарском языке" points="20 баллов" imageSrc={chitai} left={130} bottom={63}/>
        </div>
      </div>
    </MainLayout>
  );
};

export { DefaultBonus };
