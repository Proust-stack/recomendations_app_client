import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../utils/const";

export const getAllTags = createAsyncThunk(
  "tag/getAllTags",
  async function (_, { rejectWithValue, dispatch, state }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: `${SERVER}/api/tag/all`,
      });
      const tags = data.map((item) => item.tags).flat();
      dispatch(setTags([...new Set(tags)]));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getAllTagsByGroup = createAsyncThunk(
  "tag/getAllTagsByGroup",
  async function (groupId, { rejectWithValue, dispatch, state }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: `${SERVER}/api/tag/allbygroup/` + groupId,
      });

      const tags = data.map((item) => item.tags).flat();

      dispatch(setTagsByGroup([...new Set(tags)]));
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
    tags: null,
    selectedTags: [],
    tagsByGroup: null,
  },
  reducers: {
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setTagsByGroup: (state, action) => {
      state.tags = action.payload;
    },
    setSelectedTags: (state, action) => {
      let selTags = [...state.selectedTags];
      if (selTags.includes(action.payload)) {
        selTags = selTags.filter((tag) => tag !== action.payload);
      } else {
        selTags.push(action.payload);
      }
      state.selectedTags = selTags;
    },
  },
  extraReducers: {
    [getAllTags.rejected]: setError,
  },
});

export const { setTags, setSelectedTags, setTagsByGroup } = tagSlice.actions;

export default tagSlice.reducer;
