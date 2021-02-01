import { createSlice } from "@reduxjs/toolkit";

export const tickersSlice = createSlice({
  name: "user",
  initialState: ["GME", "FB"],
  reducers: {
    addTicker: (state) => {
      state.push("here");
    },
  },
});

const { actions } = tickersSlice;
export const { addTicker } = actions;
