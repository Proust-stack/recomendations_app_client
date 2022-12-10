import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllGroups = createAsyncThunk(
  "group/getAllGroups",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/group/all",
      });
      dispatch(setGroups(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const groupSlice = createSlice({
  name: "groups",
  initialState: {
    groups: [],
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
  extraReducers: {
    [getAllGroups.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getAllGroups.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [getAllGroups.rejected]: setError,
  },
});

export const { setGroups } = groupSlice.actions;

export default groupSlice.reducer;
