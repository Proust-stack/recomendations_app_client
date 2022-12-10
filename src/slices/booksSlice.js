import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllBooks = createAsyncThunk(
  "book/getAllBooks",
  async function (_, { rejectWithValue, dispatch, state }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/composition/all/63923c91c4db72d5c244041e",
      });
      dispatch(setBooks(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
  extraReducers: {
    [getAllBooks.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getAllBooks.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [getAllBooks.rejected]: setError,
  },
});

export const { setBooks } = bookSlice.actions;

export default bookSlice.reducer;
