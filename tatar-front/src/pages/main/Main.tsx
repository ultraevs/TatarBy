import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import { MainLayout } from "../../components/MainLayout";
import Hero from "../../components/Hero/Hero";
import Learn from "../../components/Learn/Learn";
import { Progress } from "../../components/Progress";
import { Posts } from "../../components/Posts/Posts";

import styles from "./styles.module.scss"

const Main = () => {
  return (
    <MainLayout>
      <div className={styles.main}>
        <Hero />
        <Learn />
        <Progress />
        <Posts />
      </div>
    </MainLayout>
  );
};

export { Main };
