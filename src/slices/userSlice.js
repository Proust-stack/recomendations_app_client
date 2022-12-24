import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../utils/const";

export const signInGoogle = createAsyncThunk(
  "user/signInGoogle",
  async function (user, { rejectWithValue, dispatch, state }) {
    const { displayName: name, email, photoURL: img } = user;
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "post",
        url: `${SERVER}/api/user/auth/google`,
        data: {
          name,
          email,
          img,
        },
      });
      dispatch(setUser(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async function (_, { rejectWithValue, dispatch, state }) {
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "get",
        url: `${SERVER}/api/user/all`,
      });
      dispatch(setAllUsers(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    allUsers: null,
    rated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    setAllUsers: (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    setRated: (state, action) => {
      state.rated = true;
    },
  },
  extraReducers: {
    [signInGoogle.rejected]: setError,
    [getAllUsers.rejected]: setError,
  },
});

export const { setUser, logout, setAllUsers, setRated } = userSlice.actions;

export default userSlice.reducer;
