import React from "react";
import { IMG_URL } from "../utils/constants";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  mediaId,
  name,
  mediaName,
  mediaTitle,
  rating,
  date,
  language,
  posterPath,
  type,
  number,
}) => {
  const navigate = useNavigate();

  const langKey = useSelector((state) => state.language.lang);

  if (!posterPath) return null;

  const uppercaseMovieName = name.toUpperCase();
  const year = date?.split("-")[0];
  const uppercaseLanguage = language.toUpperCase();
  const roundedRating = rating.toFixed(1);

  const handleMovieCardClick = () => {
    try {
      if (type === "tv" || mediaName) {
        navigate(`/series-detail/${mediaId}`);
      } else if (type === "movie" || mediaTitle) {
        navigate(`/movie-detail/${mediaId}`);
      } else {
        navigate("/error");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="relative ml-3 mb-20 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-150">
      {number && (
        <div className="absolute inset-0 left-[-10rem] md:left-[-17rem] flex items-center justify-center text-white text-[210px] md:text-[300px] font-bold opacity-80 z-1">
          {number}
        </div>
      )}
      <div
        onClick={handleMovieCardClick}
        className="cursor-pointer w-32 md:w-52"
      >
        <div className="relative">
          <img
            className="rounded-lg"
            src={IMG_URL + posterPath}
            alt="Movie Card"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 bg-opacity-70 rounded-lg"></div>
        <div className="absolute bottom-10 left-2 text-white font-black text-xs md:text-lg p-2 w-full text-left rounded-t-lg mb-0">
          {uppercaseMovieName}
        </div>
        <div className="flex absolute bottom-4 left-2 text-gray-200 font-normal text-[9px] md:text-sm p-2 w-full text-left rounded-t-lg">
          {langArray[langKey].Rating}: {roundedRating}
          <GoDotFill className="size-1 md:size-3 m-1" />
          {year}
          <GoDotFill className="size-1 md:size-3 m-1" />
          {uppercaseLanguage}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
