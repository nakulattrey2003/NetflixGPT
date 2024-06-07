import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice.js";
import moviesReducer from "./moviesSlice.js";
import languageReducer from "./languageSlice.js";
import detailReducer from "./detailSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    language: languageReducer,
    detail: detailReducer
  },
});

export default store;
