import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice.js";
import moviesReducer from "./moviesSlice.js";
import languageReducer from "./languageSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    language: languageReducer,
  },
});

export default store;
