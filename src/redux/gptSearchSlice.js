import { createSlice } from "@reduxjs/toolkit";

const gptSearchSlice = createSlice({
  name: "gptSearch",
  initialState: {
    gptMovieNames: null,
    gptMovieResults: null,
  },
  reducers: {
    addGptSearchResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.gptMovieNames = movieNames;
      state.gptMovieResults = movieResults;
    },
    clearGptSearchResult(state) {
      state.gptMovieNames = [];
      state.gptMovieResults = [];
    },
  },
});

export const { addGptSearchResult, clearGptSearchResult } =
  gptSearchSlice.actions;

export default gptSearchSlice.reducer;
