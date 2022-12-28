import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../utils/const";

export const getAllGroups = createAsyncThunk(
  "group/getAllGroups",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: `${SERVER}/api/group/all`,
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
    groups: null,
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
  extraReducers: {
    [getAllGroups.rejected]: setError,
  },
});

export const { setGroups } = groupSlice.actions;

export default groupSlice.reducer;
