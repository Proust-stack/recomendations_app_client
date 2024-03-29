import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../utils/const";

export const getAllReviewsByUser = createAsyncThunk(
  "reviews/getAllReviewsByUser",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: `${SERVER}/api/review/all/` + id,
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
        url: `${SERVER}/api/review/all/reviews/bytags`,
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
        url: `${SERVER}/api/review/all/search`,
        params: {
          q,
        },
      });
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
        url: `${SERVER}/api/review/all/composition/` + id,
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
        url: `${SERVER}/api/review/create`,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async function (review, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "patch",
        data: review.data,
        url: `${SERVER}/api/review/` + review.id,
      });
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
        url: `${SERVER}/api/review/` + id,
      });
      dispatch(setReview(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteReviews = createAsyncThunk(
  "reviews/deleteReviews",
  async function (reviews, { rejectWithValue }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "delete",
        url: `${SERVER}/api/review/remove`,
        data: {
          reviews,
        },
      });
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
        url: `${SERVER}/api/review/like/` + id,
      });
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
        url: `${SERVER}/api/review/unlike/` + id,
      });
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
    reviews: null,
    currentReview: null,
    reviewsByComposition: null,
    reviewsAll: null,
    searchResults: null,
    likesFromUserReviews: 0,
  },
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setLikes: (state, action) => {
      state.likesFromUserReviews = action.payload;
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
  },
  extraReducers: {
    [getAllReviewsByUser.rejected]: setError,
    [getAllReviewsByComposition.rejected]: setError,
    [getOneReview.rejected]: setError,
    [likeReview.rejected]: setError,
    [getAllReviewsByTags.rejected]: setError,
    [search.rejected]: setError,
    [search.deleteReviews]: setError,
    [search.updateReview]: setError,
  },
});

export const {
  setReviews,
  setReview,
  setReviewsByComposition,
  setReviewsAll,
  setSearchResults,
  setLikes,
} = reviewSlice.actions;

export default reviewSlice.reducer;
