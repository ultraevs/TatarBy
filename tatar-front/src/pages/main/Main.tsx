import React from "react";
// eslint-disable-next-line no-unused-vars
React;

import { MainLayout } from "../../components/MainLayout";
import Hero from "../../components/Hero/Hero";
import Learn from "../../components/Learn/Learn";
import { Progress } from "../../components/Progress";

const Main = () => {
  return (
    <MainLayout>
      <Hero/>
      <Learn/>
      <Progress/>
    </MainLayout>
  );
};

export { Main };
