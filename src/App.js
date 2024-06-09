import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import BrowsePage from "./pages/BrowsePage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage.js";
import GptSearchPage from "./pages/GptSearchPage.js";
import MovieDetailPage from "./pages/MovieDetailPage.js";
import ProtectRoute from "./utils/ProtectRoute";

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
            element={
              <ProtectRoute type="public" element={<RegisterPage />} />
            }
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
