import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users;
      state.pagination = action.payload.pagination;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    addUser: (state, action) => {
      state.users.unshift(action.payload);
    },
  },
});

export const { setUsers, setLoading, setError, deleteUser, addUser } =
  usersSlice.actions;
export default usersSlice.reducer;
