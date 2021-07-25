// import { API } from "../../utils/api";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/api";

const initialState = {
  username: "",
  bio: "",
  posts: [],
  firstName: "",
  lastName: "",
  followers: [],
  following: [],
};

export const getUserProfile = createAsyncThunk(
  "/user-profile",
  async (username) => {
    try {
      const response = await API.get(`/${username}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.posts = action.payload.posts;
      state.bio = action.payload.bio;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
    },
  },
  extraReducers: {},
});

export const { setUser } = profileSlice.actions;
export const profileState = (state) => state.profile;

export default profileSlice.reducer;
