import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllReviewsByUser = createAsyncThunk(
  "reviews/getAllReviewsByUser",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/review/all/" + id,
      });
      dispatch(setReviews(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
  },
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
  extraReducers: {
    [getAllReviewsByUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getAllReviewsByUser.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [getAllReviewsByUser.rejected]: setError,
  },
});

export const { setReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
