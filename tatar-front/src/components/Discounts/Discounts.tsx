import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";

const Discounts = () => {
    return ( 
        <div className={styles.discounts}>
          <div className={styles.discounts__block}>
            <h1>Бонусная программа</h1>
            <p>Обменивайте бонусы на подарки от партнеров</p>
          </div>
          <div className={styles.discounts__blur1}></div>
          <div className={styles.discounts__blur2}></div>
          <div className={styles.discounts__blur3}></div>
        </div>
     );
}
 
export {Discounts};
