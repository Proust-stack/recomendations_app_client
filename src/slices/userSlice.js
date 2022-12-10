import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";

export const signInGoogle = createAsyncThunk(
  "user/signInGoogle",
  async function (_, { rejectWithValue, dispatch }) {
    const data = await signInWithPopup(auth, provider);
    const { displayName: name, email, photoURL: img } = data.user;
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

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const initState = {
  _id: "63923e27c4db72d5c2440423",
  name: "Andre Bal",
  email: "balandrey69@gmail.com",
  isAdmin: false,
  blocked: false,
  img: "https://lh3.googleusercontent.com/a/ALm5wu1rS-FVw4QkDVzkDCHBTeSMarFRR5…",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: initState,
  },
  reducers: {
    setUser: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
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
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
