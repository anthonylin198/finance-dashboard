import { createSlice } from "@reduxjs/toolkit";

export const overviewSlice = createSlice({
  name: "overview",
  initialState: {
    rows: [],
  },
  reducers: {
    updateOverview: (state, action) => {
      state.rows = action.payload;
    },
  },
});

const { actions } = overviewSlice;
export const { updateOverview } = actions;
