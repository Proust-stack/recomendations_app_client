import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import themeReducer from "../slices/themeSlice";
import localeReducer from "../slices/localeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    locale: localeReducer,
  },
});
