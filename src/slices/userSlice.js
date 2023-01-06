import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../utils/const";

export const signInGoogle = createAsyncThunk(
  "user/signInGoogle",
  async function (user, { rejectWithValue, dispatch, state }) {
    const { displayName: name = "user", email, photoURL: img } = user;
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

export const blockUser = createAsyncThunk(
  "user/blockUser",
  async function (userId, { rejectWithValue, dispatch }) {
    try {
      await axios({
        withCredentials: true,
        method: "patch",
        url: `${SERVER}/api/user/block/` + userId,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const changeRole = createAsyncThunk(
  "user/changeRole",
  async function (userId, { rejectWithValue, dispatch }) {
    try {
      await axios({
        withCredentials: true,
        method: "patch",
        url: `${SERVER}/api/user/role/` + userId,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const unBlockUser = createAsyncThunk(
  "user/unBlockUser",
  async function (userId, { rejectWithValue, dispatch }) {
    try {
      await axios({
        withCredentials: true,
        method: "patch",
        url: `${SERVER}/api/user/unblock/` + userId,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async function (userId, { rejectWithValue, dispatch }) {
    try {
      await axios({
        withCredentials: true,
        method: "delete",
        url: `${SERVER}/api/user/` + userId,
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

const initState = {
  _id: "63923e27c4db72d5c2440423",
  name: "Andre Bal",
  email: "balandrey69@gmail.com",
  isAdmin: true,
  blocked: false,
  img: "https://lh3.googleusercontent.com/a/ALm5wu1rS-FVw4QkDVzkDCHBTeSMarFRR5…",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: initState,
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
    [blockUser.rejected]: setError,
    [changeRole.rejected]: setError,
  },
});

export const { setUser, logout, setAllUsers, setRated } = userSlice.actions;

export default userSlice.reducer;
