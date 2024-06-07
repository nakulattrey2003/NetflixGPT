import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import BrowsePage from "./pages/BrowsePage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage.js";
import GptSearchPage from "./pages/GptSearchPage.js";
import MovieDetailPage from "./pages/MovieDetailPage.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/search" element={<GptSearchPage />} />
          <Route path="/movie-detail" element={<MovieDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
