import React from "react";
import useMovieDetail from "../hooks/movies/useMovieDetail";
import useCastMovieDetail from "../hooks/movies/useCastMovieDetail";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieOverview from "../components/MovieOverview";
import MovieList from "../components/MovieList";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";
import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { id: movieId } = useParams();

  const langKey = useSelector((state) => state.language.lang);
  const movies = useSelector((store) => store.movies);

  const relatedTitle = langArray[langKey].Related;
  const todayTrendingTitle = langArray[langKey].TodayTrending;
  const topRatedTitle = langArray[langKey].TopRated;
  const upcomingTitle = langArray[langKey].Upcoming;

  useMovieDetail(movieId);
  useCastMovieDetail(movieId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <MovieOverview />
        <div>
          <MovieList title={relatedTitle} movies={movies.popularMovies} />
          <MovieList
            title={todayTrendingTitle}
            movies={movies.todayTrendingMovies}
          />
          <MovieList title={topRatedTitle} movies={movies.topRatedMovies} />
          <MovieList title={upcomingTitle} movies={movies.upcomingMovies} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetailPage;
