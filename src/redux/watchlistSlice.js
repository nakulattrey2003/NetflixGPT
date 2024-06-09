import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState: [],
    reducers: {
        addWatchlist: (state, action) => {
            return [...state, action.payload];
        },
        removeWatchlist: (state, action) => {
            return state.filter((movie) => movie.id !== action.payload.id);
        },
    },
});

export const {addWatchlist, removeWatchlist} = watchlistSlice.actions;

export default watchlistSlice.reducer;