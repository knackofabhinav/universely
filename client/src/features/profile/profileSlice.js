// import { API } from "../../utils/api";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: "",
  _id: "",
  bio: "",
  posts: [],
  firstName: "",
  lastName: "",
  followers: [],
  following: [],
};

export const followUser = createAsyncThunk(
  "profile/followUser",
  async ({ username }) => {
    try {
      const response = await axios.post("/follow", { username });
      return response.data.rootUserFollowing;
    } catch (err) {
      console.log(err);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "profile/unfollowUser",
  async ({ username }) => {
    try {
      const response = await axios.delete(`/follow/${username}`);
      return response.data.rootUserFollowing;
    } catch (err) {
      console.log(err);
    }
  }
);

export const setUpdateUser = createAsyncThunk(
  "profile/updateUser",
  (user) => {
    return user
  }
)

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
      state._id = action.payload._id;
    },
    setFollowingUsers: (state, action) => {
      state.following = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(followUser.fulfilled, (state, action) => {
        state.following = action.payload;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.following = action.payload;
      })
      .addCase(setUpdateUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.posts = action.payload.posts;
      state.bio = action.payload.bio;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
      state._id = action.payload._id;
      })
  },
});

export const { setUser, setFollowers, setFollowingUsers } =
  profileSlice.actions;
export const profileState = (state) => state.profile;

export default profileSlice.reducer;
