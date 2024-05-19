import { configureStore } from "@reduxjs/toolkit";
import currentTasksSlice from "./slices/currentTasks/currentTasksSlice";
import currentCourseSlice from "./slices/currentCourse/currentCourseSlice";

export const store = configureStore({
  reducer: {
    course: currentCourseSlice,
    taskList: currentTasksSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
