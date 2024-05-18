import React, { ReactNode } from "react";
// eslint-disable-next-line no-unused-vars
React;

import styles from "./styles.module.scss";
import { Header } from "../Header";
import { Footer } from "../Footer";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <div className={styles.mainLayout__content}>{children}</div>
      <Footer />
    </div>
  );
};

export { MainLayout };
