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

export const getAllReviewsByTags = createAsyncThunk(
  "reviews/getAllReviewsByTags",
  async function (tags, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/review/all/reviews/bytags",
        params: {
          tags,
        },
      });
      dispatch(setReviewsAll(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const search = createAsyncThunk(
  "reviews/search",
  async function (q, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/review/all/search",
        params: {
          q,
        },
      });
      console.log(data);
      dispatch(setSearchResults(data));
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
  async function (id, { rejectWithValue, dispatch, state }) {
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
export const deleteReviews = createAsyncThunk(
  "reviews/deleteReviews",
  async function (reviews, { rejectWithValue, dispatch, state }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "delete",
        url: "http://localhost:5000/api/review/remove",
        data: {
          reviews,
        },
      });
      console.log(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const likeReview = createAsyncThunk(
  "reviews/likeReview",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "patch",
        url: "http://localhost:5000/api/review/like/" + id,
      });
      console.log("like", data);
      dispatch(changeReview(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const unLikeReview = createAsyncThunk(
  "reviews/unLikeReview",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "patch",
        url: "http://localhost:5000/api/review/unlike/" + id,
      });
      console.log("unlike", data);
      dispatch(changeReview(data));
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
    searchResults: [],
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
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setReviewsAll: (state, action) => {
      state.reviewsAll = action.payload;
    },
    changeReview: (state, action) => {
      console.log(action.payload);
      state.reviewsAll.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        }
        return item;
      });
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

    [likeReview.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [likeReview.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [likeReview.rejected]: setError,

    [getAllReviewsByTags.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getAllReviewsByTags.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [getAllReviewsByTags.rejected]: setError,

    [search.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [search.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [search.rejected]: setError,

    [search.deleteReviews]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [search.deleteReviews]: (state) => {
      state.status = "resolved";
    },
    [search.deleteReviews]: setError,
  },
});

export const {
  setReviews,
  setReview,
  setReviewsByComposition,
  setReviewsAll,
  changeReview,
  setSearchResults,
} = reviewSlice.actions;

export default reviewSlice.reducer;
