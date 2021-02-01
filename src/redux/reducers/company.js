import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    bio: "",
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("company_token");
      state.name = "";
      state.email = "";
      state.isAuthenticated = false;
    },
  },
});

const { actions } = companySlice;
export const { logout } = actions;
