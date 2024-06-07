import React from "react";
import { useSelector } from "react-redux";
import { IMG_URL } from "../utils/constants";
import Skeleton from "./Skeleton";

const MovieOverview = () => {
  const movie = useSelector((state) => state.detail.movieDetail);
  const cast = useSelector((state) => state.detail.castDetail);

  if (!movie || !cast) {
    return <div><Skeleton /></div>; // Handle the case when movie is null or undefined
  }

  console.log("movie", movie);
  console.log("cast", cast);

  return (
    <div className="relative w-full h-screen z-0  flex justify-center items-center overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMG_URL + movie?.backdrop_path}
          alt="background-image"
          className="object-cover w-full h-full fixed z-0 filter blur-sm"
        />
      </div>

      {/* Movie Image and Content */}
      <div className="z-10 w-3/4 h-full flex flex-col justify-center items-center">
        <img
          className="h-12 w-12"
          src={IMG_URL + movie?.poster_path}
          alt="movie-image"
        />
        <div>{movie?.original_title}</div>
        <div>
          {movie?.release_date} - {movie?.vote_average} -{" "}
          {movie?.original_language}
        </div>
        <div>
          {movie.genres.map((it) => (
            <div key={it.id}>{it.name}</div>
          ))}
        </div>
        <div>{movie.overview}</div>
        <div>
          <div>
            <button>Play</button>
          </div>
          <div>
            <button>Info</button>
          </div>
        </div>
      </div>

      {/* Cast Details */}
      <div className="z-10 w-1/4 h-full flex flex-col justify-center items-center">
        {cast.cast
          .concat() // these are used to solve according to popularity  (chatgpt se kia hai)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 5)
          .map((it) => (
            <div key={it.cast_id}>
              <div>
                <img src={IMG_URL + it.profile_path} alt="character-dp" />
              </div>
              <div>{it.character}</div>
              <div>{it.original_name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieOverview;
