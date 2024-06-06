import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    lang: "english",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
