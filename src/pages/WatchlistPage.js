import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import langArray from "../utils/langConstants";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import MovieCard from "../components/MovieCard";
import { clearWatchlist, removeFromWatchlist } from "../redux/watchlistSlice";
import { toast } from "react-toastify";
import { RiDeleteBin6Fill } from "react-icons/ri";

const WatchlistPage = () => {
  const dispatch = useDispatch();

  const langKey = useSelector((state) => state.language.lang);
  const watchlist = useSelector((state) => state.watchlist.watchlistArray);
  const user = useSelector((state) => state.user);

  const [sortByYear, setSortByYear] = useState("descending");
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  // Function to sort the movies by release date
  const sortMoviesByYear = (movies, order) => {
    const sortedMovies = [...movies];
    sortedMovies.sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return order === "ascending" ? dateA - dateB : dateB - dateA;
    });
    return sortedMovies;
  };

  const handleClearWatchlist = () => {
    toast.success("Watchlist cleared successfully!");
    dispatch(clearWatchlist({ userId: user.uid }));
  };

  const handleDeleteMovie = (movie) => {
    toast(` 👍🏼 ${movie.original_title} is Removed from the Watchlist`);
    dispatch(removeFromWatchlist({ movie, userId: user.uid }));
  };

  // Sort the watchlist based on selected sorting option
  const sortedWatchlist = sortMoviesByYear(watchlist, sortByYear);

  // Check if the watchlist is empty
  const isListEmpty = sortedWatchlist.length === 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 relative">
        <div className="fixed top-0 left-0 w-full h-2/5 z-0">
          <img
            src="/NetflixGPT Res/WatchlistBG.jpg"
            alt="Watchlist Background"
            className="object-cover w-full h-full filter blur-sm"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 mt-6 flex items-center justify-center text-white text-4xl font-bold">
            <FaHeart className="mr-3" />
            <div>{langArray[langKey].Watchlist}</div>
          </div>
        </div>
        <div className={`relative z-10 pt-10 mt-56 bg-black rounded-2xl`}>
          <div
            className={`ml-28 bg-black ${
              isListEmpty ? "h-96 " : "h-auto"
            }`}
          >
            <div className="flex justify-between mb-6 mr-7">
              <h2 className="text-3xl border-l-4 font-bold mb-4 h-9 text-white border-red-500 pl-4">
                {langArray[langKey].YourWatchlist}
              </h2>
              <select
                value={sortByYear}
                onChange={(e) => setSortByYear(e.target.value)}
                className="px-9 mb-5 py-3 rounded bg-gray-800 text-white mr-10"
              >
                <option value="ascending">
                  {langArray[langKey].OldestFirst}
                </option>
                <option value="descending">
                  {langArray[langKey].NewestFirst}
                </option>
              </select>
            </div>
            {/* Conditionally render based on whether watchlist is empty or not */}
            {isListEmpty && (
              <div className="text-gray-400 text-xl text-center">
                {langArray[langKey].YourWatchlistIsEmpty}
              </div>
            )}
            {!isListEmpty && (
              <div className="grid grid-cols-6 gap-2">
                {sortedWatchlist.map((movie) => (
                  <div
                    key={movie.id}
                    className="relative"
                  >
                    <MovieCard
                      movieId={movie.id}
                      rating={movie.vote_average}
                      date={movie.release_date}
                      language={movie.original_language}
                      movieName={movie.original_title}
                      posterPath={movie.poster_path}
                    />
                        <RiDeleteBin6Fill />
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={handleClearWatchlist}
              className="px-6 py-3 rounded-xl bg-gray-800 text-white hover:bg-gray-700 focus:outline-none"
              style={{ position: "absolute", bottom: "40px", right: "120px" }}
            >
              {langArray[langKey].ClearAll}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WatchlistPage;
