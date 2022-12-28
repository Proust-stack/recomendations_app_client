import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../utils/const";

export const sendComment = createAsyncThunk(
  "comment/sendComment",
  async function (comment, { rejectWithValue, dispatch }) {
    try {
      await axios({
        withCredentials: true,
        method: "post",
        data: comment,
        url: `http://localhost:5000/api/comment/create`,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllComments = createAsyncThunk(
  "comment/getAllComments",
  async function (reviewId, { rejectWithValue, dispatch, state }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: `http://localhost:5000/api/comment/all/` + reviewId,
      });
      dispatch(setComments(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: null,
  },
  reducers: {
    setComments: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
  },
  extraReducers: {
    [sendComment.rejected]: setError,
  },
});

export const { setComments } = commentSlice.actions;

export default commentSlice.reducer;
