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
export const getAllReviewsForHomePage = createAsyncThunk(
  "reviews/getAllReviewsForHomePage",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/review",
      });
      dispatch(setReviewsAll(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getAllReviewsByComposition = createAsyncThunk(
  "reviews/getAllReviewsByComposition",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/review/all/composition/" + id,
      });
      dispatch(setReviewsByComposition(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async function (review, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "post",
        data: review,
        url: "http://localhost:5000/api/review/create",
      });
      dispatch(setReview(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOneReview = createAsyncThunk(
  "reviews/getOneReview",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/review/" + id,
      });
      console.log(data);
      dispatch(setReview(data));
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
    currentReview: {},
    reviewsByComposition: [],
    reviewsAll: [],
  },
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setReview: (state, action) => {
      state.currentReview = action.payload;
    },
    setReviewsByComposition: (state, action) => {
      state.reviewsByComposition = action.payload;
    },
    setReviewsAll: (state, action) => {
      state.reviewsAll = action.payload;
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

    [getAllReviewsByComposition.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getAllReviewsByComposition.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [getAllReviewsByComposition.rejected]: setError,

    [getOneReview.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getOneReview.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [getOneReview.rejected]: setError,

    [getAllReviewsForHomePage.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getAllReviewsForHomePage.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [getAllReviewsForHomePage.rejected]: setError,
  },
});

export const { setReviews, setReview, setReviewsByComposition, setReviewsAll } =
  reviewSlice.actions;

export default reviewSlice.reducer;