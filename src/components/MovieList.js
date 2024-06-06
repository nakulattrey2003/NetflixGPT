import React from "react";
import MovieCard from "./MovieCard";
import { RiMovie2Fill } from "react-icons/ri";
import { FaFire } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { SiNextra } from "react-icons/si";

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) {
    return <div>No movies available</div>;
  }

  return (
    <div className="overflow-scroll  text-white">
      <div className="absolute -mt-11 ml-20 text-2xl font-bold flex">
        {title == "Now Playing" && (
          <RiMovie2Fill className="bg-red-500 p-1 size-8 mr-4 text-black rounded-md" />
        )}
        {title == "Popular" && (
          <FaFire className="bg-red-500 p-1 size-8 mr-4 text-black rounded-md" />
        )}
        {title == "Top Rated" && (
          <FaStar className="bg-red-500 p-1 size-8 mr-4 text-black rounded-md" />
        )}
        {title == "Upcoming" && (
          <SiNextra className="bg-red-500 p-1 size-8 mr-4 text-black rounded-md" />
        )}
        {title}
      </div>
      <div className="flex ml-16">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            rating={movie.vote_average}
            date={movie.release_date}
            language={movie.original_language}
            movieName={movie.original_title}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
