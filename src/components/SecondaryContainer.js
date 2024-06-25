import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";

const SecondaryContainer = () => {
  const langKey = useSelector((state) => state.language.lang);
  const movies = useSelector((store) => store.movies);
  const series = useSelector((store) => store.series);
  const mediaType = useSelector((store) => store.mediaType.type);

  const todayTrendingTitle = langArray[langKey].TodayTrending;
  const nowPlayingTitle = langArray[langKey].NowPlaying;
  const popularTitle = langArray[langKey].Popular;
  const topRatedTitle = langArray[langKey].TopRated;
  const upcomingTitle = langArray[langKey].Upcoming;

  return (
    <div className="bg-black">
      {mediaType === "movies" && movies && (
        <div className="pl-0 lg:-mt-40 relative z-20">
          <MovieList
            title={todayTrendingTitle}
            movies={movies.todayTrendingMovies}
          />
          <MovieList title={nowPlayingTitle} movies={movies.nowPlayingMovies} />
          <MovieList title={popularTitle} movies={movies.popularMovies} />
          <MovieList title={topRatedTitle} movies={movies.topRatedMovies} />
          <MovieList title={upcomingTitle} movies={movies.upcomingMovies} />
        </div>
      )}
      {mediaType === "series" && series && (
        <div className="pl-0 lg:-mt-40 relative z-20">
          <MovieList
            title={todayTrendingTitle}
            movies={series.todayTrendingSeries}
          />
          <MovieList title={nowPlayingTitle} movies={series.nowPlayingSeries} />
          <MovieList title={popularTitle} movies={series.popularSeries} />
          <MovieList title={topRatedTitle} movies={series.topRatedSeries} />
          <MovieList title={upcomingTitle} movies={series.upcomingSeries} />
        </div>
      )}
    </div>
  );
};

export default SecondaryContainer;
