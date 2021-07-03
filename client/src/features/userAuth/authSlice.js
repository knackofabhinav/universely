import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../utils/api";

const authTokenFromLocalStorage = localStorage.getItem("authToken");

const initialState = {
  status: null,
  isLoginedIn: false,
  authToken: authTokenFromLocalStorage || null,
};

export const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await API.post("/login", credentials);
    localStorage.setItem("authToken", response.data?.accessToken);
    return response;
  } catch (err) {
    console.log(err);
  }
});

export const signup = createAsyncThunk("auth/signup", async (credentials) => {
  try {
    const response = await API.post("/signup", credentials);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload?.data.status === 401) {
          state.status = "authentication error";
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.isLoginedIn = true;
        console.log(action);
        state.authToken = action.payload?.data.accessToken;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload?.data.status === 401) {
          state.status = "authentication error";
        }
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.isLoginedIn = true;
        state.authToken = action.payload?.data.accessToken;
      });
  },
});

export const authState = (state) => state.auth;

export default authSlice.reducer;
