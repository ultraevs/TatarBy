import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "../pages/main";
import { Auth } from "../pages/auth";
import { Register } from "../pages/register";
import { Courses } from "../pages/courses";
import { Course } from "../pages/course";
import { Profile } from "../pages/profile";
import { Bonus } from "../pages/bonus";
import { Lesson } from "../pages/lesson";
import { Test } from "../pages/test";
import { Result } from "../pages/result";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Course/:id" element={<Course />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Bonus" element={<Bonus />} />
        <Route path="/Lesson/:id" element={<Lesson />} />
        <Route path="/Test/:id" element={<Test />} />
        <Route path="/Test/:id/Result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
