import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import complaintsReducer from "./slices/complaintsSlice";
import trustmarkSlice from "./slices/trustmarkSlice";
import inspectionSlice from "./slices/insepectionSlice";
import projectSlice from "./slices/projectSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: usersReducer,
      complaints: complaintsReducer,
      trustmark: trustmarkSlice,
      inspection: inspectionSlice,
      projects: projectSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};
