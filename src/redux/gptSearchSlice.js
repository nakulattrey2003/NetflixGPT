import { createSlice } from "@reduxjs/toolkit";

const gptSearchSlice = createSlice({
    name:"gptSearch",
    initialState:{
        gptSearchResult: null
    },
    reducers:{
        addGptSearchResult: (state, action) => {
            state.gptSearchResult = action.payload;
        }
    }
});

export const { addGptSearchResult } = gptSearchSlice.actions;

export default gptSearchSlice.reducer;