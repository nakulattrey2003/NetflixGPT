import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMG_URL } from "../utils/constants";
import Skeleton from "../shimmer/CardSkeleton";
import { GoDotFill } from "react-icons/go";
import langArray from "../utils/langConstants";
import { CiCircleInfo } from "react-icons/ci";
import { FaPlay, FaRegHeart, FaHeart } from "react-icons/fa";
import ReactPlayer from "react-player";
import useSeriesTrailer from "../hooks/series/useSeriesTrailer";
import { useParams } from "react-router-dom";
import { addToWatchlist, removeFromWatchlist } from "../redux/watchlistSlice";
import { toast } from "react-toastify";
import useRelatedSeries from "../hooks/series/useRelatedSeries";

const SeriesOverview = () => {
  const series = useSelector((state) => state.detail.seriesDetail);
  const cast = useSelector((state) => state.detail.castSeriesDetail);
  const langKey = useSelector((state) => state.language.lang);
  const user = useSelector((state) => state.user);
  const watchlistArray =
    useSelector((state) => state.watchlist.watchlistArray) || [];

  const { id: seriesId } = useParams();
  const dispatch = useDispatch();

  useRelatedSeries(seriesId);

  const [isExpanded, setIsExpanded] = useState(false);
  const [playingMovie, setPlayingMovie] = useState(false);
  const [playingTrailer, setPlayingTrailer] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const trailerKey = useSeriesTrailer(seriesId);

  const lessInfoText = langArray[langKey].LessInfo || "Less Info";
  const moreInfoText = langArray[langKey].MoreInfo || "More Info";

  const numberOfSeasons = series?.number_of_seasons;
  const seasonsText = numberOfSeasons === 1 ? " Season" : " Seasons";

  useEffect(() => {
    if (!series) return;

    setIsInWatchlist(
      !!watchlistArray.find((item) => item && item.id === series.id)
    );
  }, [series]);

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

  const handlePlayMovie = () => {
    setPlayingMovie(true);
  };

  const handlePlayTrialer = () => {
    setPlayingTrailer(true);
  };

  const handleWatchlist = () => {
    if (!series || !seriesId || !user) return;

    if (isInWatchlist) {
      toast(` 👍🏼 ${series.name} is Removed From Watchlist`);
      dispatch(removeFromWatchlist({ media: series, userId: user.uid }));
    } else {
      toast(` 🔥 ${series.name} is Added to the Watchlist`);
      dispatch(addToWatchlist({ media: series, userId: user.uid }));
    }

    setIsInWatchlist(!isInWatchlist);
  };

  if (!series || !cast) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  const roundedRating = series?.vote_average.toFixed(1);
  const upperCaseLanguage = series?.original_language.toUpperCase();

  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        {series.backdrop_path ? (
          <img
            src={IMG_URL + series.backdrop_path}
            alt="background-image"
            className="object-cover w-full h-full fixed z-0 filter blur-sm"
          />
        ) : (
          <div className="bg-gray-800 fixed h-full w-full" />
        )}
      </div>

      <div className="z-10 relative grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 h-full lg:-ml-24">
        <div className="col-span-1 row-span-2 -mt-10 flex justify-center items-center">
          <img
            className="h-[50%] md:h-[40%] lg:h-[65%] z-10 m-1 mt-10 md:m-3 p-2 rounded-3xl"
            src={IMG_URL + series?.poster_path}
            alt="movie-image"
          />
          <div className="absolute inset-0 bg-black opacity-40 z-0 h-full full-height"></div>
        </div>

        <div className="z-10 text-white col-span-1 row-span-1 flex flex-col justify-center items-center md:items-start md:justify-start mx-3 -mt-24 md:mt-60 lg:mt-44 md:mr-36 lg:-ml-28 mb-10">
          <div className="text-xl md:text-5xl uppercase font-bold">
            {series?.name}
          </div>
          <div className="mb-4 text-xs md:text-base text-gray-300">
            {series?.tagline}
          </div>
          <div className="flex text-xs md:text-base mb-1 md:mb-4">
            {series?.first_air_date}
            <GoDotFill className=" size-2 md:size-4 mx-3 mt-1" />
            <div className="bg-teal-800 text-white font-semibold text-[10px] md:text-sm py-1 px-2 -mt-1 rounded-lg shadow-md bg-opacity-50">
              ⭐{roundedRating}
            </div>
            <GoDotFill className="size-2 md:size-4 mx-3 mt-1" />
            {upperCaseLanguage}
            <GoDotFill className="size-2 md:size-4 mx-3 mt-1" />
            {series?.number_of_seasons} {seasonsText}
          </div>
          <div className="flex ml-6 md:-ml-4 mb-4">
            {series.genres.map((it) => (
              <div
                className="bg-teal-700 -ml-1 md:ml-4 text-cyan-300 text-[10px] md:text-base mx-3 px-2 md:px-4 py-1 md:py-2 rounded-lg shadow-md bg-opacity-55"
                key={it.id}
              >
                {it.name}
              </div>
            ))}
          </div>
          <div className="text-gray-200 text-justify text-xs lg:text-base mb-4 mx-6 md:mx-0 md:mr-14">
            {isExpanded ? series.overview : splitOverview(series.overview, 50)}
          </div>
          <div className="flex -ml-4">
            <div>
              <button
                onClick={handlePlayMovie}
                className="flex ml-4 mr-3 bg-gray-100 hover:bg-gray-400 text-black font-black py-1 px-4 md:py-2 md:px-4 text-xs md:text-base rounded"
              >
                <FaPlay className="mt-1 mr-2 h-2 w-2 md:h-4 md:w-4" />
                {langArray[langKey].Play}
              </button>
            </div>
            <div>
              <button
                className="flex bg-transparent border hover:border-white hover:bg-slate-600 bg-opacity-50 hover:bg-opacity-50 text-white font-bold hover:text-white py-1 px-4 md:py-2 md:px-4 text-xs md:text-base hover:border-transparent rounded"
                onClick={handleExpand}
              >
                <CiCircleInfo className="mr-2 h-4 w-4 md:h-6 md:w-6" />
                {isExpanded ? lessInfoText : moreInfoText}
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="flex mt-2 justify-center cursor-pointer items-center border md:mt-4 py-1 px-4 md:py-2 md:px-4 text-xs md:text-base rounded w-[223px] md:w-[278px] font-bold hover:bg-gray-800 hover:border-white z-10 hover:bg-opacity-60"
              onClick={handleWatchlist}
            >
              <div className="absolute inset-0 bg-red-500 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"></div>
              {isInWatchlist ? (
                <div className="flex ">
                  <FaHeart className="mr-2 mt-[4px] h-3 w-3 md:h-4 md:w-4" />
                  {langArray[langKey].Added}
                </div>
              ) : (
                <>
                  <FaRegHeart className="mr-2" />
                  {langArray[langKey].AddToList}
                </>
              )}
            </div>
            <div
              onClick={handlePlayTrialer}
              style={{ width: "fit-content" }}
              className="text-xl text-white hover:text-white hover:font-bold mt-4 -mb-7 cursor-pointer relative"
            >
              <p>{langArray[langKey].WatchTrailer}</p>
              <div className="absolute inset-0 bg-gray-200 rounded-lg opacity-0 hover:opacity-100 blur hover:w-full bg-opacity-50 transition-opacity duration-300 z-0"></div>
            </div>
          </div>
        </div>
        <div className="flex z-10 overflow-x-auto justify-center md:justify-start md:-ml-32 gap-2 md:gap-4 mt-4 md:mt-32 mb-10">
          {cast.cast
            // .concat()
            // .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 5)
            .map((it) => (
              <div
                key={it.cast_id}
                className="flex flex-col items-center text-center"
              >
                <div className="">
                  {it.profile_path ? (
                    <img
                      className="h-12 w-12 md:w-20 md:h-20 rounded-full object-cover"
                      src={IMG_URL + it.profile_path}
                      alt="character-dp"
                    />
                  ) : (
                    <img
                      className="h-16 w-16 md:w-20 md:h-20 rounded-full object-cover"
                      src="https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
                      alt="default-character-dp"
                    />
                  )}
                </div>
                <div className="font-bold text-[10px] md:text-sm text-white break-words w-16 md:w-28">
                  {it.name}
                </div>
                <div className="text-gray-300 text-[10px] md:text-sm break-words w-16 md:w-28">
                  {it.character}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* trailer */}
      {playingTrailer && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <ReactPlayer
            url={`https://www.youtube.com/embed/${trailerKey}?&loop=1&playlist=${trailerKey}`}
            playing={playingTrailer}
            allow="autoplay"
            controls={true}
            width="100%"
            height="100%"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full m-4 h-27 w-27"
            onClick={() => setPlayingTrailer(false)}
          >
            ✖
          </button>
        </div>
      )}

      {/* movie  */}
      {playingMovie && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <iframe
            className="w-full h-full"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={`https://vidsrc.xyz/embed/tv/${seriesId}`}
          ></iframe>
          <button
            className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-full"
            onClick={() => setPlayingMovie(false)}
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default SeriesOverview;
