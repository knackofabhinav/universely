import { createSlice } from "@reduxjs/toolkit";
// import { useColorMode } from "@chakra-ui/react";

// const { colorMode, toggleColorMode } = useColorMode();
const initialState = {
  isDark: false,
  // colorMode: colorMode
};

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
