import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: localStorage.getItem("theme") === "dark",
};

const themeslice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", state.darkMode ? "dark" : "light");
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("theme", action.payload ? "dark" : "light");
    },
  },
});

export const { toggleDarkMode, setDarkMode } = themeslice.actions;
export default themeslice.reducer;
