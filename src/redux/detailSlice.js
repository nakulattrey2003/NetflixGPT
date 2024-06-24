import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    movieDetail: null,
    castMovieDetail: null,
    seriesDetail: null,
    castSeriesDetail: null,
  },
  reducers: {
    addMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
    addCastMovieDetail: (state, action) => {
      state.castMovieDetail = action.payload;
    },
    addSeriesDetail: (state, action) => {
      state.seriesDetail = action.payload;
    },
    addCastSeriesDetail: (state, action) => {
      state.castSeriesDetail = action.payload;
    },
  },
});

export const {
  addMovieDetail,
  addCastMovieDetail,
  addSeriesDetail,
  addCastSeriesDetail,
} = detailSlice.actions;

export default detailSlice.reducer;
