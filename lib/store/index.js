import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import complaintsReducer from "./slices/complaintsSlice";
import trustmarkSlice from "./slices/trustmarkSlice";
import inspectionSlice from "./slices/insepectionSlice";
import projectSlice from "./slices/projectSlice";
import activitySlice from "./slices/activitySlice";
import notificationsSlice from "./slices/notificationsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: usersReducer,
      complaints: complaintsReducer,
      trustmark: trustmarkSlice,
      inspection: inspectionSlice,
      projects: projectSlice,
      activity: activitySlice,
      notifications: notificationsSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};
