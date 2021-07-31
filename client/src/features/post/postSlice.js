import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../utils/api";
const initialState = {
  feed: [],
};

export const createNewPost = createAsyncThunk("posts/create", async (post) => {
  try {
    const response = await API.post("/posts/create", post);
    return response.data.post;
  } catch (err) {
    console.log(err);
  }
});

export const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewPost.fulfilled, (state, action) => {
      state.feed = [action.payload, ...state.feed];
      console.log(current(state));
    });
  },
});

export default postSlice.reducer;
