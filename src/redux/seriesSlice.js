import { createSlice } from "@reduxjs/toolkit";

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    todayTrendingSeries: null,
    nowPlayingSeries: null,
    popularSeries: null,
    topRatedSeries: null,
    upcomingSeries: null,
  },
  reducers: {
    addTodayTrendingSeries: (state, action) => {
      state.todayTrendingSeries = action.payload;
    },
    addNowPlayingSeries: (state, action) => {
      state.nowPlayingSeries = action.payload;
    },
    addPopularSeries: (state, action) => {
      state.popularSeries = action.payload;
    },
    addTopRatedSeries: (state, action) => {
      state.topRatedSeries = action.payload;
    },
    addUpcomingSeries: (state, action) => {
      state.upcomingSeries = action.payload;
    },
  },
});

export const {
  addTodayTrendingSeries,
  addNowPlayingSeries,
  addPopularSeries,
  addTopRatedSeries,
  addUpcomingSeries,
} = seriesSlice.actions;

export default seriesSlice.reducer;
