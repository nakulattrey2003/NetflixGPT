import React from "react";
import useMovieDetails from "../hooks/useMovieDetail";
import useCastDetail from "../hooks/useCastDetail";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieOverview from "../components/MovieOverview";
import MovieList from "../components/MovieList";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";

const MovieDetailPage = () => {
  const langKey = useSelector((state) => state.language.lang);
  const movies = useSelector((store) => store.movies);

  const relatedTitle = langArray[langKey].Popular;
  useMovieDetails();
  useCastDetail();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <MovieOverview />
        <MovieList title={relatedTitle} movies={movies.popularMovies} />
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetailPage;
