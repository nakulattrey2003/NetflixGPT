import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import BrowsePage from "./pages/BrowsePage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage.js";
import GptSearchPage from "./pages/GptSearchPage.js";
import MovieDetailPage from "./pages/MovieDetailPage.js";
import WatchlistPage from "./pages/WatchlistPage.js";
import ProtectRoute from "./utils/ProtectRoute";
import SeriesDetailPage from "./pages/SeriesDetailPage.js";
import SeriesBrowsePage from "./pages/SeriesBrowsePage.js";
import GenreMoviePage from "./pages/GenreMoviePage.js";
import GenreSeriesPage from "./pages/GenreSeriesPage.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectRoute type="public" element={<LoginPage />} />}
          />
          <Route
            path="/login"
            element={<ProtectRoute type="public" element={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<ProtectRoute type="public" element={<RegisterPage />} />}
          />
          <Route
            path="/browse"
            element={<ProtectRoute type="private" element={<BrowsePage />} />}
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="/search"
            element={
              <ProtectRoute type="private" element={<GptSearchPage />} />
            }
          />
          <Route
            path="/movie-detail/:id"
            element={
              <ProtectRoute type="private" element={<MovieDetailPage />} />
            }
          />
          <Route
            path="/series-detail/:id"
            element={
              <ProtectRoute type="private" element={<SeriesDetailPage />} />
            }
          />
          <Route
            path="/watchlist"
            element={
              <ProtectRoute type="private" element={<WatchlistPage />} />
            }
          />
          <Route
            path="/series"
            element={
              <ProtectRoute type="private" element={<SeriesBrowsePage />} />
            }
          />
          <Route
            path="/genre-movie/:id"
            element={
              <ProtectRoute type="private" element={<GenreMoviePage />} />
            }
          />
          <Route
            path="/genre-series/:id"
            element={
              <ProtectRoute type="private" element={<GenreSeriesPage />} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
