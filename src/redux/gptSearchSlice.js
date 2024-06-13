import { createSlice } from "@reduxjs/toolkit";

const gptSearchSlice = createSlice({
    name:"gptSearch",
    initialState:{
        gptMovieNames: null,
        gptMovieResults: null
    },
    reducers:{
        addGptSearchResult: (state, action) => {
            const {movieNames, movieResults} = action.payload;
            state.gptMovieNames = movieNames;
            state.gptMovieResults = movieResults;
        }
    }
});

export const { addGptSearchResult } = gptSearchSlice.actions;

export default gptSearchSlice.reducer;