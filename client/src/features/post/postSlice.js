import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/api";
const initialState = {
  feed: [],
};

export const createNewPost = createAsyncThunk("posts/create", async (post) => {
  try {
    const response = await API.post("/posts/create", post);
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
      const response = await API.post("/posts/liked", { userId, postId });
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.feed = [action.payload, ...state.feed];
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

export const { initialFeed } = postSlice.actions;

export default postSlice.reducer;
