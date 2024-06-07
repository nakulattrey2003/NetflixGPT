import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (movies == null) return;

  // const randomcount = Math.floor(Math.random() * (movies.length));
  // const mainMovie = movies[randomcount];

  const mainMovie = movies[9];   // 10 for garfield and 7 for inside out 2

  const {
    original_title,
    overview,
    original_language,
    vote_average,
    release_date,
    id,
  } = mainMovie;

  return (
    <div>
      <VideoTitle
        title={original_title}
        overview={overview}
        language={original_language}
        rating={vote_average}
        date={release_date}
      />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
