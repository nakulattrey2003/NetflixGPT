import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice.js";
import moviesReducer from "./moviesSlice.js";
import languageReducer from "./languageSlice.js";
import detailReducer from "./detailSlice.js";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import watchlistReducer from "./watchlistSlice.js";
import gptSearchReducer from "./gptSearchSlice.js";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
  language: languageReducer,
  detail: detailReducer,
  watchlist: watchlistReducer,
  gptSearch: gptSearchReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
