import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import themeReducer from "../slices/themeSlice";
import localeReducer from "../slices/localeSlice";
import groupReducer from "../slices/groupSlice";
import bookReducer from "../slices/booksSlice";
import gameReducer from "../slices/gamesSlice";
import movieReducer from "../slices/moviesSlice";
import reviewReducer from "../slices/reviewSlice";
import compositionReducer from "../slices/compositionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    locale: localeReducer,
    group: groupReducer,
    book: bookReducer,
    game: gameReducer,
    movie: movieReducer,
    review: reviewReducer,
    composition: compositionReducer,
  },
});
