import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMG_URL } from "../utils/constants";
import Skeleton from "./Skeleton";
import { GoDotFill } from "react-icons/go";
import langArray from "../utils/langConstants";
import { CiCircleInfo } from "react-icons/ci";
import { FaPlay, FaRegHeart, FaHeart } from "react-icons/fa";
import ReactPlayer from "react-player";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useParams } from "react-router-dom";
import { addToWatchlist, removeFromWatchlist } from "../redux/watchlistSlice";

const MovieOverview = () => {
  
  const user = useSelector((state) => state.user);
  const movie = useSelector((state) => state.detail.movieDetail);
  const cast = useSelector((state) => state.detail.castDetail);
  const langKey = useSelector((state) => state.language.lang);
  const watchlistArray =
    useSelector((state) => state.watchlist.watchlistArray) || [];

  const dispatch = useDispatch();
  const { id: movieId } = useParams();

  const [isExpanded, setIsExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const trailerKey = useMovieTrailer(movieId);

  const lessInfoText = langArray[langKey].LessInfo || "Less Info";
  const moreInfoText = langArray[langKey].MoreInfo || "More Info";

  useEffect(() => {
    if(!movie) return ;

    setIsInWatchlist(
      !!watchlistArray.find((item) => item && item.id === movie.id)
    );
  }, [movie]);

  const splitOverview = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handleWatchlist = () => {
    if (!movie || !movieId || !user) return;

    if (isInWatchlist) {
      dispatch(removeFromWatchlist({ movie, userId : user.uid }));
    } else {
      dispatch(addToWatchlist({ movie, userId : user.uid }));
    }

    setIsInWatchlist(!isInWatchlist);
  };

  if (!movie || !cast) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  const roundedRating = movie?.vote_average.toFixed(1);
  const upperCaseLanguage = movie?.original_language.toUpperCase();

  return (
    <div className="">
      <div className="">
        <img
          src={IMG_URL + movie?.backdrop_path}
          alt="background-image"
          className="object-cover w-full h-full fixed z-0 filter blur-sm"
        />
      </div>

      <div className="z-10 relative grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 h-full -ml-24">
        <div className="col-span-1 row-span-2 -mt-10 flex justify-center items-center">
          <img
            className="h-[65%] z-10 m-3 p-2 rounded-3xl"
            src={IMG_URL + movie?.poster_path}
            alt="movie-image"
          />
          <div className="absolute inset-0 bg-black opacity-40 z-0 h-full full-height"></div>
        </div>

        <div className="z-10 text-white col-span-1 row-span-1 flex flex-col justify-left items-left mt-44 mr-36 -ml-28 ">
          <div className="text-5xl uppercase font-bold">
            {movie?.original_title}
          </div>
          <div className="mb-4 text-gray-300">{movie?.tagline}</div>
          <div className="flex mb-4">
            {movie?.release_date}
            <GoDotFill className="size-4 mx-3 mt-1" />
            <div className="bg-teal-800 text-white font-semibold text-sm py-1 px-2 -mt-1 rounded-lg shadow-md bg-opacity-50">
              ⭐{roundedRating}
            </div>
            <GoDotFill className="size-4 mx-3 mt-1" />
            {upperCaseLanguage}
          </div>
          <div className="flex -ml-4 mb-4">
            {movie.genres.map((it) => (
              <div
                className="bg-teal-700 ml-4 text-cyan-300 px-4 py-2 rounded-lg shadow-md bg-opacity-55"
                key={it.id}
              >
                {it.name}
              </div>
            ))}
          </div>
          <div className="text-gray-200 text-md mb-4 mr-14">
            {isExpanded ? movie.overview : splitOverview(movie.overview, 60)}
          </div>
          <div className="flex -ml-4">
            <div>
              <button
                onClick={handlePlay}
                className="flex ml-4 mr-3 bg-gray-200 hover:bg-gray-300 text-black font-black py-2 px-4 rounded"
              >
                <FaPlay className="mt-1 mr-2" /> {langArray[langKey].Play}
              </button>
            </div>
            <div>
              <button
                className="flex bg-transparent border hover:border-white hover:bg-slate-600 bg-opacity-50 hover:bg-opacity-50 text-white font-bold hover:text-white py-2 px-4 hover:border-transparent rounded"
                onClick={handleExpand}
              >
                <CiCircleInfo className="mr-2 h-6 w-6" />{" "}
                {isExpanded ? lessInfoText : moreInfoText}
              </button>
            </div>
          </div>
          <div
            className="flex justify-center cursor-pointer items-center border mt-4 py-2 px-4 rounded w-[278px] font-bold hover:bg-gray-200 hover:text-black"
            onClick={handleWatchlist}
          >
            {isInWatchlist ? (
              <div className="flex ">
                <FaHeart className="mr-2 mt-1" />
                {langArray[langKey].Added}
              </div>
            ) : (
              <>
                <FaRegHeart className="mr-2" />
                {langArray[langKey].AddToList}
              </>
            )}
          </div>
        </div>

        <div className="col-span-1 row-span-1 z-10 gap-4 overflow-hidden flex justify-left items-left -ml-28 mt-32">
          {cast.cast
            // .concat()
            // .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 5)
            .map((it) => (
              <div key={it.cast_id}>
                <div className="">
                  <img
                    className="w-20 h-20 rounded-full object-cover"
                    src={IMG_URL + it.profile_path}
                    alt="character-dp"
                  />
                </div>
                <div className="font-bold text-sm text-white break-words w-28">
                  {it.original_name}
                </div>
                <div className="text-gray-300 text-sm break-words w-28">
                  {it.character}
                </div>
              </div>
            ))}
        </div>
      </div>

      {playing && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <ReactPlayer
            url={`https://www.youtube.com/embed/${trailerKey}?&loop=1&playlist=${trailerKey}`}
            playing={playing}
            controls={true}
            width="100%"
            height="100%"
          />
          <button
            className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
            onClick={() => setPlaying(false)}
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieOverview;
