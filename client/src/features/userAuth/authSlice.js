import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../utils/api";

const initialState = {
  status: null,
  isLoggedIn: !!localStorage.getItem("authToken") ? true : false,
  authToken: !!localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : null,
  userId: null,
};

export const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await API.post("/login", credentials);
    localStorage.setItem("authToken", JSON.stringify(response.data?.authToken));
    localStorage.setItem("user", JSON.stringify(response.data?.user));
    // setAuthTokenForAPI(response.data?.authToken);
    return response;
  } catch (err) {
    console.log(err);
  }
});

export const signup = createAsyncThunk("auth/signup", async (credentials) => {
  try {
    const response = await API.post("/signup", credentials);
    localStorage.setItem("authToken", JSON.stringify(response.data?.authToken));
    localStorage.setItem("user", JSON.stringify(response.data?.savedUser));
  } catch (err) {
    console.log(err);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.isLoggedIn = true;
        state.authToken = action.payload.data.accessToken;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload?.data.status === 401) {
          state.status = "authentication error";
        }
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
        state.isLoggedIn = true;
        state.authToken = action.payload?.data.accessToken;
        state.userId = action.payload?.data.savedUser._id;
      });
  },
});

export const authToken = (state) => state.auth.authToken;
export const { logout } = authSlice.actions;

export default authSlice.reducer;
