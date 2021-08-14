import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  feed: [],
};

export const createNewPost = createAsyncThunk("posts/create", async (post) => {
  try {
    const response = await axios.post("/posts/create", post);
    console.log(response);
    return response?.data?.post;
  } catch (err) {
    console.log(err);
  }
});

export const postLiked = createAsyncThunk(
  "posts/liked",
  async ({ userId, postId }) => {
    try {
      const response = await axios.post("/posts/liked", { userId, postId });
      return response?.data?.post;
    } catch (err) {
      console.log(err);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    initialFeed: (state, action) => {
      state.feed = action.payload.data.feed;
    },
    updateFeed: (state, action) => {
      state.feed = action.payload.data.feed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.feed = [action.payload, ...state.feed];
        console.log(current(state));
      })
      .addCase(postLiked.fulfilled, (state, action) => {
        state.feed.map((post) =>
          post._id === action.payload._id
            ? (post.likes = action.payload.likes)
            : post
        );
      });
  },
});

export const { initialFeed, updateFeed } = postSlice.actions;
export const feedState = (state) => state.posts;

export default postSlice.reducer;
