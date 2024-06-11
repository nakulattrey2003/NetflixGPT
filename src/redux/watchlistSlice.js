import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchlistArray: [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const { movie } = action.payload;
      state.watchlistArray.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(state.watchlistArray));
    },
    removeFromWatchlist: (state, action) => {
      const { movie } = action.payload;
      state.watchlistArray = state.watchlistArray.filter(
        (it) => it.id !== movie.id
      );
      localStorage.setItem("watchlist", JSON.stringify(state.watchlistArray));
    },
    loadWatchlist: (state, action) => {
      const storedWatchlist = localStorage.getItem("watchlist");
      state.watchlistArray = storedWatchlist ? JSON.parse(storedWatchlist) : [];
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, loadWatchlist } =
  watchlistSlice.actions;

export default watchlistSlice.reducer;
