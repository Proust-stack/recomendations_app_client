import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import userReducer from "../slices/userSlice";
import themeReducer from "../slices/themeSlice";
import localeReducer from "../slices/localeSlice";
import groupReducer from "../slices/groupSlice";
import bookReducer from "../slices/booksSlice";
import gameReducer from "../slices/gamesSlice";
import movieReducer from "../slices/moviesSlice";
import reviewReducer from "../slices/reviewSlice";
import compositionReducer from "../slices/compositionSlice";
import tagReducer from "../slices/tagSlice";
import commentReducer from "../slices/commentSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  locale: localeReducer,
  group: groupReducer,
  book: bookReducer,
  game: gameReducer,
  movie: movieReducer,
  review: reviewReducer,
  composition: compositionReducer,
  tag: tagReducer,
  comment: commentReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
