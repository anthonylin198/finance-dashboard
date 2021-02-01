import { createSlice } from "@reduxjs/toolkit";

export const tickersSlice = createSlice({
  name: "tickers",
  initialState: {
    tickers: [],
  },
  reducers: {
    addTicker: (state, action) => {
      state.tickers = action.payload;
    },
  },
});

const { actions } = tickersSlice;
export const { addTicker } = actions;
