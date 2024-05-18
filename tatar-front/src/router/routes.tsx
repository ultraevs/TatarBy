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
import { Welcome } from "../pages/quiz";
import { Materials } from "../pages/materials";
import { DefaultBonus } from "../pages/defaultbonus";



const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Quiz" element={<Welcome />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Course/:id" element={<Course />} />
        <Route path="/Materials" element={<Materials />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/DefaultBonus" element={<DefaultBonus/>}/>
        <Route path="/Bonus" element={<Bonus />} />
        <Route path="/Lesson/:id" element={<Lesson />} />
        <Route path="/Test/:id" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
