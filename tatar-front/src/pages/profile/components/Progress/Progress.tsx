import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { ProgressItem } from "../ProgressItem";

type Props = {
  items: any[];
};

const Progress = ({ items }: Props) => {
  console.log(items);
  return (
    <div className={styles.progress}>
      {items.map((item, index) => (
        <ProgressItem key={item.nickname} item={item} index={index} />
      ))}
    </div>
  );
};

export { Progress };
