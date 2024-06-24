import React from "react";
import MovieCard from "./MovieCard";
import { RiMovie2Fill } from "react-icons/ri";
import { FaFire } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { SiNextra } from "react-icons/si";
import { useSelector } from "react-redux";
import { BiSolidMoviePlay } from "react-icons/bi";
import langArray from "../utils/langConstants";

const MovieList = ({ title, movies }) => {
  const langKey = useSelector((state) => state.language.lang);

  const todayTrendingTitle = langArray[langKey].TodayTrending;
  const nowPlayingTitle = langArray[langKey].NowPlaying;
  const popularTitle = langArray[langKey].Popular;
  const topRatedTitle = langArray[langKey].TopRated;
  const upcomingTitle = langArray[langKey].Upcoming;
  const relatedTitle = langArray[langKey].Related;

  if (!movies || movies.length === 0) {
    return <div>No movies available</div>;
  }

  return (
    <div className="overflow-scroll text-white z-10">
      <div className="absolute -mt-1 md:-mt-11 ml-10 md:ml-20 text-base md:text-2xl font-bold flex">
        {title === todayTrendingTitle && (
          <FaFire className="bg-red-500 p-1 size-6 md:size-8 mr-4 text-black rounded-md" />
        )}
        {title === nowPlayingTitle && (
          <RiMovie2Fill className="bg-red-500 p-1 size-6 md:size-8 mr-4 text-black rounded-md" />
        )}
        {title === popularTitle && (
          <FaFire className="bg-red-500 p-1 size-6 md:size-8 mr-4 text-black rounded-md" />
        )}
        {title === topRatedTitle && (
          <FaStar className="bg-red-500 p-1 size-6 md:size-8 mr-4 text-black rounded-md" />
        )}
        {title === upcomingTitle && (
          <SiNextra className="bg-red-500 p-1 size-6 md:size-8 mr-4 text-black rounded-md" />
        )}
        {title === relatedTitle && (
          <BiSolidMoviePlay className="bg-red-500 p-1 size-6 md:size-8 mr-4 text-black rounded-md" />
        )}
        {title}
      </div>
      <div className="flex mt-8 ml-7 md:ml-16 gap-1 md:gap-7 md:mt-3">
        {movies?.map((media) => (
          <MovieCard
            key={media.id}
            mediaId={media.id}
            rating={media.vote_average}
            date={media.release_date || media.first_air_date}
            language={media.original_language}
            movieName={media.title || media.name}
            posterPath={media.poster_path}
            type={media.media_type}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
