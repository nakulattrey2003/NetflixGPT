import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import Skeleton from "../components/Skeleton";
import FilterDropdown from "../components/FilterDropdown";
import langArray from "../utils/langConstants";

const GptSearchPage = () => {
  const gptSearch = useSelector((state) => state.gptSearch.gptSearchResult);
  const langKey = useSelector((state) => state.language.lang);

  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    setFilteredMovies(gptSearch);
  }, [gptSearch]);

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    let sortedMovies = [...gptSearch];

    switch (filter) {
      case "newest":
        sortedMovies = sortedMovies.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
        break;
      case "oldest":
        sortedMovies = sortedMovies.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
        break;
      case "highestRated":
        sortedMovies = sortedMovies.sort(
          (a, b) => b.vote_average - a.vote_average
        );
        break;
      case "popular":
        sortedMovies = sortedMovies.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        sortedMovies = gptSearch;
    }

    setFilteredMovies(sortedMovies);
  };

  return (
    <div className="bg-gray-900 to-black min-h-screen w-full flex flex-col">
      <Header />
      <div className="flex flex-col py-10">
        <div className="flex items-center justify-between pl-4 ml-28 mt-20 mb-20">
          <div className="border-l-4 pl-4 border-red-500 text-white text-4xl font-bold">
            {langArray[langKey].SearchResults}
          </div>
          <div className="mr-28">
          <FilterDropdown onChange={handleFilterChange} />
          </div>
        </div>
        <div className="container mx-auto px-4">
          {!gptSearch ? (
            <Skeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
              {filteredMovies?.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  rating={movie.vote_average}
                  date={movie.release_date}
                  language={movie.original_language}
                  movieName={movie.title}
                  posterPath={movie.poster_path}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GptSearchPage;
