import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTags = createAsyncThunk(
  "tag/getAllTags",
  async function (_, { rejectWithValue, dispatch, state }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/tag/all",
      });
      const tags = data.map((item) => item.tags).flat();
      dispatch(setTags(tags));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
  },
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
  },
  extraReducers: {
    [getAllTags.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getAllTags.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [getAllTags.rejected]: setError,
  },
});

export const { setTags } = tagSlice.actions;

export default tagSlice.reducer;