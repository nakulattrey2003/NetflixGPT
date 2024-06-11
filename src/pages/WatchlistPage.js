import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import langArray from "../utils/langConstants";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import MovieCard from "../components/MovieCard";

const WatchlistPage = () => {
  const langKey = useSelector((state) => state.language.lang);
  const watchlist = useSelector((state) => state.watchlist.watchlistArray);

  const [sortByYear, setSortByYear] = useState("ascending");

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

  // Sort the watchlist based on selected sorting option
  const sortedWatchlist = sortMoviesByYear(watchlist, sortByYear);

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
          <div className="absolute inset-0 mt-12 flex items-center justify-center text-white text-4xl font-bold">
            <FaHeart className="mr-3" />
            <div>{langArray[langKey].Watchlist}</div>
          </div>
        </div>
        <div className="relative z-10 pt-2/5 py-10 mt-72 bg-black">
          <div className="container mx-auto ml-28 rounded-lg bg-black">
            <div className="flex justify-between mb-6">
              <h2 className="text-3xl border-l-4 font-bold mb-4 text-white border-red-500 pl-4">
                Your Watchlist
              </h2>
              <select
                value={sortByYear}
                onChange={(e) => setSortByYear(e.target.value)}
                className="px-9 mb-5 py-3 rounded bg-gray-800 text-white"
              >
                <option value="ascending">Oldest First</option>
                <option value="descending">Newest First</option>
              </select>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {sortedWatchlist.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  rating={movie.vote_average}
                  date={movie.release_date}
                  language={movie.original_language}
                  movieName={movie.original_title}
                  posterPath={movie.poster_path}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WatchlistPage;
