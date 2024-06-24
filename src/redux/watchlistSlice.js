import { createSlice } from "@reduxjs/toolkit";

const getWatchlistKey = (userId) => `watchlist_${userId}`;

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchlistArray: [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const { media, userId } = action.payload;

      const watchlistKey = getWatchlistKey(userId);

      state.watchlistArray.push(media);
      localStorage.setItem(watchlistKey, JSON.stringify(state.watchlistArray));
    },
    removeFromWatchlist: (state, action) => {
      const { media, userId } = action.payload;

      const watchlistKey = getWatchlistKey(userId);

      state.watchlistArray = state.watchlistArray.filter(
        (it) => it.id !== media.id
      );
      localStorage.setItem(watchlistKey, JSON.stringify(state.watchlistArray));
    },
    loadWatchlist: (state, action) => {
      const { userId } = action.payload;

      const watchlistKey = getWatchlistKey(userId);

      const storedWatchlist = localStorage.getItem(watchlistKey);
      state.watchlistArray = storedWatchlist ? JSON.parse(storedWatchlist) : [];
    },
    clearWatchlist: (state, action) => {
      const { userId } = action.payload;
      
      const watchlistKey = getWatchlistKey(userId);

      state.watchlistArray = [];
      localStorage.setItem(watchlistKey, JSON.stringify(state.watchlistArray));
    },
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  loadWatchlist,
  clearWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
