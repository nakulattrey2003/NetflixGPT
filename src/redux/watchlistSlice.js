import { createSlice } from "@reduxjs/toolkit";

const getWatchlistKey = (userId) => `watchlist_${userId}`;

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchlistArray: [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const { movie, userId } = action.payload;

      const watchlistKey = getWatchlistKey(userId);

      state.watchlistArray.push(movie);
      localStorage.setItem(watchlistKey, JSON.stringify(state.watchlistArray));
    },
    removeFromWatchlist: (state, action) => {
      const { movie, userId } = action.payload;

      const watchlistKey = getWatchlistKey(userId);

      state.watchlistArray = state.watchlistArray.filter(
        (it) => it.id !== movie.id
      );
      localStorage.setItem(watchlistKey, JSON.stringify(state.watchlistArray));
    },
    loadWatchlist: (state, action) => {
      const {userId} = action.payload;

      const watchlistKey = getWatchlistKey(userId);

      const storedWatchlist = localStorage.getItem(watchlistKey);
      state.watchlistArray = storedWatchlist ? JSON.parse(storedWatchlist) : [];
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, loadWatchlist } =
  watchlistSlice.actions;

export default watchlistSlice.reducer;
