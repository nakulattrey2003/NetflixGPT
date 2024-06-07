import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
    name: "detail",
    initialState: {
        movieDetail: null,
        castDetail: null,
    },
    reducers: {
        addMovieDetail: (state, action) => {
            state.movieDetail = action.payload;
        },
        addCastDetail: (state, action) => {
            state.castDetail = action.payload
        }
    }
})

export const {addMovieDetail, addCastDetail} = detailSlice.actions;

export default detailSlice.reducer;