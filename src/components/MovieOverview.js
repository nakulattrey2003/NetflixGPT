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
    <div className="mt-36 w-full h-screen z-0 flex overflow-hidden text-white">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMG_URL + movie?.backdrop_path}
          alt="background-image"
          className="object-cover w-full h-full fixed z-0 filter blur-sm"
        />
        {/* Black Overlay */}
        <div className="absolute h-full inset-0 bg-black opacity-40"></div>
      </div>

      {/* Movie Image and Content */}
      <div className="flex flex-col">
      <div className="z-10 w-3/4 h-full flex ">
        <img
          className="h-3/4 m-4 p-2 rounded-3xl"
          src={IMG_URL + movie?.poster_path}
          alt="movie-image"
        />
        <div className="flex flex-col ml-6">
          <div className="mt-6 uppercase text-5xl font-black mb-4">
            {movie?.original_title}
          </div>
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
      </div>

      {/* Cast Details */}
      <div className="z-10 -mt-96 -ml-24 h-20 flex flex-row justify-center items-center space-x-4 text-white">
        {cast.cast
          .concat() // these are used to solve according to popularity  (chatgpt se kia hai)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 5)
          .map((it) => (
            <div key={it.cast_id}>
              <div>
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  src={IMG_URL + it.profile_path}
                  alt="character-dp"
                />
              </div>
              <div className="text-gray-300">{it.character}</div>
              <div className="font-bold">{it.original_name}</div>
            </div>
          ))}
      </div>
      </div>
    </div>
  );
};

export default MovieOverview;