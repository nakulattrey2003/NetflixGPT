import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";

const SecondaryContainer = () => {
  const langKey = useSelector((state) => state.language.lang);
  const movies = useSelector((store) => store.movies);

  const todayTrendingTitle = langArray[langKey].TodayTrending;
  const nowPlayingTitle = langArray[langKey].NowPlaying;
  const popularTitle = langArray[langKey].Popular;
  const topRatedTitle = langArray[langKey].TopRated;
  const upcomingTitle = langArray[langKey].Upcoming;

  
  return (
    <div className="bg-black">
      <div className="-mt-40 relative z-20">
        <MovieList title={todayTrendingTitle} movies={movies.todayTrendingMovie} />
        <MovieList title={nowPlayingTitle} movies={movies.nowPlayingMovies} />
        <MovieList title={popularTitle} movies={movies.popularMovies} />
        <MovieList title={topRatedTitle} movies={movies.topRatedMovies} />
        <MovieList title={upcomingTitle} movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
