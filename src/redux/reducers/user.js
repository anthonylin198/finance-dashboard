import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    completion: {},
    bio: "",
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.name = "";
      state.email = "";
      state.isAuthenticated = false;
    },
  },
});

const { actions } = userSlice;
export const { logout } = actions;
