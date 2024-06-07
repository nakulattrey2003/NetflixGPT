import React from "react";
import useMovieDetail from "../hooks/useMovieDetail";
import useCastDetail from "../hooks/useCastDetail";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieOverview from "../components/MovieOverview";
import MovieList from "../components/MovieList";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";
import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { id: movieId } = useParams();
  // console.log("movieId", movieId);

  const langKey = useSelector((state) => state.language.lang);
  const movies = useSelector((store) => store.movies);

  const relatedTitle = langArray[langKey].Popular;

  useMovieDetail(movieId);
  useCastDetail(movieId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <MovieOverview />
        <div className="bg-black -mt-12">
          <MovieList title={relatedTitle} movies={movies.popularMovies} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetailPage;
