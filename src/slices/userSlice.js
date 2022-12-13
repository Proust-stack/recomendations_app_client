import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signInGoogle = createAsyncThunk(
  "user/signInGoogle",
  async function (user, { rejectWithValue, dispatch, state }) {
    console.log(user);
    const { displayName: name, email, photoURL: img } = user;
    try {
      const { data } = await axios({
        withCredentials: true,
        method: "post",
        url: "http://localhost:5000/api/user/auth/google",
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
        url: "http://localhost:5000/api/user/all",
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
    allUsers: [],
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
  },
  extraReducers: {
    [signInGoogle.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [signInGoogle.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [signInGoogle.rejected]: setError,

    [getAllUsers.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getAllUsers.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [getAllUsers.rejected]: setError,
  },
});

export const { setUser, logout, setAllUsers } = userSlice.actions;

export default userSlice.reducer;
