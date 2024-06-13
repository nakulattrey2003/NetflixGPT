import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import SearchSkeleton from "../components/SearchSkeleton";
import FilterDropdown from "../components/FilterDropdown";
import langArray from "../utils/langConstants";
import MovieList from "../components/MovieList";

const GptSearchPage = () => {
  const gptMovieNames = useSelector((state) => state.gptSearch.gptMovieNames);
  const gptMovieResults = useSelector(
    (state) => state.gptSearch.gptMovieResults
  );
  const langKey = useSelector((state) => state.language.lang);

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("newest");
  const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
      // Simulating API fetch delay for demonstration
      setIsLoading(true);
      setTimeout(() => {
        setFilteredMovies(gptMovieResults);
        setIsLoading(false);
      }, 2000); // Simulating 2 seconds delay
    }, [gptMovieResults]);

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    filterMovies(filter);
  };

  const filterMovies = (filter) => {
    let sortedMovies = [...gptMovieResults];

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
        sortedMovies = gptMovieResults;
    }

    setFilteredMovies([...sortedMovies]);
  }

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
          {isLoading ? (
            <SearchSkeleton /> // Show skeleton while loading
          ) : (
            filteredMovies.map((movie, index) => (
              <MovieList
                key={movie}
                title={gptMovieNames[index]}
                movies={gptMovieResults[index]}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GptSearchPage;
