import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.todayTrendingMovie);

  if (movies == null) return;

  // const randomcount = Math.floor(Math.random() * (movies.length));
  // const mainMovie = movies[randomcount];

  const mainMovie = movies[3];

  const {
    title,
    overview,
    original_language,
    vote_average,
    release_date,
    id,
  } = mainMovie;

  return (
    <div className="pt-[30%] lg:[pt-30%] bg-black md:pt-0">
      <VideoTitle
        title={title}
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
