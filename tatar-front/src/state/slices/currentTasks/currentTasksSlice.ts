import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  currentItem: null,
  currentIndex: 0,
  amount: 0,
  progress: 0,
};

export const currentTasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setCurrentItems: (state, action) => {
      if (action.payload) {
        state.items = action.payload.items;
        state.amount = action.payload.items.length;
        state.currentItem = action.payload.items[0];
        state.currentIndex = 0;
        state.progress = 0;
      }
    },
    setCurrentItem: (state, action) => {
      if (action.payload) {
        state.currentIndex += 1;
        state.currentItem = action.payload.item;
        state.progress += action.payload.progress;
      }
    },
  },
});

export const { setCurrentItems, setCurrentItem } = currentTasksSlice.actions;

export default currentTasksSlice.reducer;
