import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      postId: "dfrsdw4er534tgfd",
      caption: "Hello world",
    },
  ],
};

export const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
});

export default postSlice.reducer;
