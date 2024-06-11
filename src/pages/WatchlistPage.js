import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import langArray from "../utils/langConstants";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import MovieCard from "../components/MovieCard";

const WatchlistPage = () => {
  const langKey = useSelector((state) => state.language.lang);
  const watchlist = useSelector((state) => state.watchlist.watchlistArray);
  

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
          <div className="container mx-auto ml-28 rounded-lg shadow-lg bg-black">
            {/* Card content goes here */}
            <h2 className="text-3xl border-l-4 font-bold mb-4 text-white pl-4">
              Your Watchlist
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1">
              {watchlist?.map((movie) => (
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
