import { createSlice } from "@reduxjs/toolkit";
import { useColorMode } from "@chakra-ui/react";
const initialState = {
  isDark: false,
};
// const { colorMode, toggleColorMode } = useColorMode();

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
