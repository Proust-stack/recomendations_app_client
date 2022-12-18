import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllGames = createAsyncThunk(
  "games/getAllGames",
  async function (id, { rejectWithValue, dispatch, state }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: "http://localhost:5000/api/composition/all/63923c65c4db72d5c244041c",
      });
      dispatch(setGames(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: null,
  },
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
  },
  extraReducers: {
    [getAllGames.rejected]: setError,
  },
});

export const { setGames } = gamesSlice.actions;

export default gamesSlice.reducer;
