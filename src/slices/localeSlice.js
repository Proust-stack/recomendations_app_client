import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: "en",
};

export const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    changeLocale: (state, action) => {
      state.locale = action.payload.locale;
    },
  },
});

export const { changeLocale } = localeSlice.actions;

export default localeSlice.reducer;
