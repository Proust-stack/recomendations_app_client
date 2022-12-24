import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../utils/const";

export const getAllBooks = createAsyncThunk(
  "book/getAllBooks",
  async function (_, { rejectWithValue, dispatch, state }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: `${SERVER}/composition/all/63923c91c4db72d5c244041e`,
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
    books: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
  extraReducers: {
    [getAllBooks.rejected]: setError,
  },
});

export const { setBooks } = bookSlice.actions;

export default bookSlice.reducer;
