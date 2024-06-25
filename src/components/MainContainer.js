import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import SeriesTitle from "./SeriesTitle";
import SeriesBackground from "./SeriesBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies.todayTrendingMovies);
  const series = useSelector((store) => store.series.todayTrendingSeries);
  const mediaType = useSelector((store) => store.mediaType.type);

  if (!movies || !series) return null;

  // const randomcount = Math.floor(Math.random() * (movies.length));
  // const mainMovie = movies[randomcount];

  const mainMovie = movies[3];
  const mainSeries = series[3];

  return (
    <>
      {mediaType === "movies" && mainMovie && (
        <div className="pt-[30%] lg:[pt-30%] bg-black md:pt-0">
          <VideoTitle
            title={mainMovie.title || mainMovie.name}
            overview={mainMovie.overview}
            language={mainMovie.original_language}
            rating={mainMovie.vote_average}
            date={mainMovie.release_date || mainMovie.first_air_date}
            type={mainMovie.media_type}
            mediaId={mainMovie.id}
          />
          <VideoBackground mediaId={mainMovie.id} />
        </div>
      )}
      {mediaType === "series" && mainSeries && (
        <div className="pt-[30%] lg:[pt-30%] bg-black md:pt-0">
          <SeriesTitle
            title={mainSeries.title || mainSeries.name}
            overview={mainSeries.overview}
            language={mainSeries.original_language}
            rating={mainSeries.vote_average}
            date={mainSeries.release_date || mainSeries.first_air_date}
            type={mainSeries.media_type}
            mediaId={mainSeries.id}
          />
          <SeriesBackground mediaId={mainSeries.id}/>
        </div>
      )}
    </>
  );
};

export default MainContainer;
