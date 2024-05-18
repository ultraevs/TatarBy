import { configureStore } from "@reduxjs/toolkit";
import currentTasksSlice from "./slices/currentTasks/currentTasksSlice";

export const store = configureStore({
  reducer: {
    taskList: currentTasksSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
