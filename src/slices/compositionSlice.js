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

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const compositionSlice = createSlice({
  name: "composition",
  initialState: {
    currentComposition: {},
  },
  reducers: {
    setComposition: (state, action) => {
      state.currentComposition = action.payload;
    },
  },
  extraReducers: {
    [getOneComposition.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getOneComposition.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [getOneComposition.rejected]: setError,
  },
});

export const { setComposition } = compositionSlice.actions;

export default compositionSlice.reducer;
