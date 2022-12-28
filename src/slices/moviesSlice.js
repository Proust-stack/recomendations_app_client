import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../utils/const";

export const getAllMovies = createAsyncThunk(
  "games/getAllMovies",
  async function (_, { rejectWithValue, dispatch, state }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: `${SERVER}/api/composition/all/63923cbcc4db72d5c2440420`,
      });
      dispatch(setMovies(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: null,
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
  extraReducers: {
    [getAllMovies.rejected]: setError,
  },
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
