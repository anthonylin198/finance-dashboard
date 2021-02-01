import { createSlice } from "@reduxjs/toolkit";

export const tickersSlice = createSlice({
  name: "user",
  initialState: {
    tickers: [],
  },
  reducers: {
    addTicker: (state, action) => {
      console.log("this is the state", state);
      state.tickers = action.payload;
    },
  },
});

const { actions } = tickersSlice;
export const { addTicker } = actions;
