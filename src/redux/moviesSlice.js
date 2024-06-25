import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    todayTrendingMovies: null,
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    relatedMovies: null,
  },
  reducers: {
    addTodayTrendingMovies: (state, action) => {
      state.todayTrendingMovies = action.payload;
    },
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addRelatedMovies: (state, action) => {
      state.relatedMovies = action.payload;
    }
  },
});

export const {
  addTodayTrendingMovies,
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addRelatedMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
