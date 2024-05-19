import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseID: null,
};

export const currentCourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseID: (state, action) => {
      if (action.payload) {
        state.courseID = action.payload.id;
      }
    },
  },
});

export const { setCourseID } = currentCourseSlice.actions;

export default currentCourseSlice.reducer;
