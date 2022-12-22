import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOneComposition = createAsyncThunk(
  "composition/getOneComposition",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/composition/" + id,
      });
      dispatch(setComposition(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setUserRating = createAsyncThunk(
  "composition/setUserRating",
  async function (userRatingData, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "patch",
        data: userRatingData,
        url:
          "http://localhost:5000/api/composition/userrating/" +
          userRatingData.compositionId,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllByGroup = createAsyncThunk(
  "composition/getAllByGroup",
  async function (groupId, { rejectWithValue, dispatch, state }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/composition/all/" + groupId,
      });
      dispatch(setCompositions(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getAllCompositions = createAsyncThunk(
  "composition/getAllCompositions",
  async function (_, { rejectWithValue, dispatch, state }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/composition/compositions/all/nofilter",
      });
      dispatch(setAllCompositions(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const compositionSlice = createSlice({
  name: "composition",
  initialState: {
    currentComposition: null,
    compositionsByGroup: null,
    allCompositions: null,
  },
  reducers: {
    setComposition: (state, action) => {
      state.currentComposition = action.payload;
    },
    setCompositions: (state, action) => {
      state.compositionsByGroup = action.payload;
    },
    setAllCompositions: (state, action) => {
      state.allCompositions = action.payload;
    },
  },
  extraReducers: {
    [getOneComposition.rejected]: setError,
    [getAllByGroup.rejected]: setError,
    [getAllCompositions.rejected]: setError,
    [setUserRating.rejected]: setError,
  },
});

export const { setComposition, setCompositions, setAllCompositions } =
  compositionSlice.actions;

export default compositionSlice.reducer;
