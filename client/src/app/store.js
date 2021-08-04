import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import authReducer from "../features/userAuth/authSlice";
import profileReducer from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    profile: profileReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
