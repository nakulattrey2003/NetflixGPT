import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.todayTrendingMovies);

  if (movies == null) return;

  // const randomcount = Math.floor(Math.random() * (movies.length));
  // const mainMovie = movies[randomcount];

  const mainMovie = movies[3];

  const {
    title,
    name,
    overview,
    original_language,
    vote_average,
    release_date,
    first_air_date,
    id,
    media_type
  } = mainMovie;

  return (
    <div className="pt-[30%] lg:[pt-30%] bg-black md:pt-0">
      <VideoTitle
        title={title || name}
        overview={overview}
        language={original_language}
        rating={vote_average}
        date={release_date || first_air_date}
        type={media_type}
        mediaId={id}
      />
      <VideoBackground mediaId={id} type={media_type} />
    </div>
  );
};

export default MainContainer;
