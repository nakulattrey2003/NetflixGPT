import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "../redux/userSlice.js";
import moviesReducer from "./moviesSlice.js";
import languageReducer from "./languageSlice.js";
import watchlistReducer from "./watchlistSlice.js";
import detailReducer from "./detailSlice.js";
import gptSearchReducer from "./gptSearchSlice.js";
import seriesReducer from "./seriesSlice.js";
import mediaTypeReducer from "./mediaTypeSlice.js";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
  series: seriesReducer,
  language: languageReducer,
  detail: detailReducer,
  watchlist: watchlistReducer,
  gptSearch: gptSearchReducer,
  mediaType: mediaTypeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
