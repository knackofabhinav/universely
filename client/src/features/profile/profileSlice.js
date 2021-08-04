// import { API } from "../../utils/api";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/api";

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

// export const getFollowingUsers = createAsyncThunk("/following", async (username) => {
//   try {
//     const response = await API.get(`/following/${username}`)
//     console.log(response.data)
//   } catch (err) {
//     console.error(err)
//   }
// })

// export const getUserProfile = createAsyncThunk(
//   "/user-profile",
//   async (username) => {
//     try {
//       const response = await API.get(`/${username}`);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

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
  },
  extraReducers: {},
});

export const { setUser, setFollowingUsers } = profileSlice.actions;
export const profileState = (state) => state.profile;

export default profileSlice.reducer;
