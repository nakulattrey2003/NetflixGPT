import React, { useState } from "react";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import SearchSkeleton from "../shimmer/SearchSkeleton";

const GenreMoviePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className="bg-gray-900 to-black min-h-screen w-full flex flex-col">
        <Header />
        <div className="flex flex-col mt-20 md:mt-0 py-10">
          <div className="flex items-center justify-between md:pl-4 ml-10 md:ml-28 md:mt-20 md:mb-20">
            <div className="border-l-4 pl-4 border-red-500 text-white text-2xl md:text-4xl font-bold">
              {/* {langArray[langKey].GenreResults} */}
              Genre
            </div>
          </div>
          <div className="container mt-10 mb:mt-0 mx-auto px-4">
            {/* {isLoading ? (
              <SearchSkeleton /> // Show skeleton while loading
            ) : (
              gptMovieResults.map((movie, index) => (
                <MovieList
                  key={movie}
                  title={gptMovieNames[index]}
                  movies={gptMovieResults[index]}
                />
              ))
            )} */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default GenreMoviePage;
