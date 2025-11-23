import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely access localStorage
const getStoredAuth = () => {
  if (typeof window !== "undefined") {
    return {
      userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
      token: localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null,
    };
  }
  return {
    userInfo: null,
    token: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getStoredAuth(),
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.userInfo = user;
      state.token = token;

      // Store in localStorage (client-side only)
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(user));
        localStorage.setItem("token", token);
      }
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;

      // Remove from localStorage (client-side only)
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
