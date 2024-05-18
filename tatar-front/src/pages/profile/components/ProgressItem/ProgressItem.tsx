import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { getColorByStat } from "../../../../utils/func";

type Props = {
  item: any;
  index: number;
};

const ProgressItem = ({ item, index }: Props) => {
  return (
    <div className={styles.progressItem}>
      <span style={{ color: `${getColorByStat(index + 1).color}` }}>
        {index + 1}
      </span>
      <span>{item.nickname}</span>
      <span>{item.score} очков</span>
    </div>
  );
};

export { ProgressItem };
