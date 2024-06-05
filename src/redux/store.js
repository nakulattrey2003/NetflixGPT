import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../redux/userSlice.js";
import moviesReducer from "./moviesSlice.js";

const store = configureStore(
    {
        reducer: {
            user: useReducer,
            movies: moviesReducer,
        }
    }
)

export default store;