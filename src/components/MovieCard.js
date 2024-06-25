import React from "react";
import { IMG_URL } from "../utils/constants";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  mediaId,
  rating,
  date,
  language,
  movieName,
  posterPath,
  type,
}) => {
  const navigate = useNavigate();

  const langKey = useSelector((state) => state.language.lang);

  if (!posterPath) return null;

  const uppercaseMovieName = movieName.toUpperCase();
  const year = date?.split("-")[0];
  const uppercaseLanguage = language.toUpperCase();
  const roundedRating = rating.toFixed(1);

  const handleMovieCardClick = () => {
    try {
      if (type == "tv") {
        navigate("/series-detail/" + mediaId);
      } else{
        navigate("/movie-detail/" + mediaId);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div className="relative ml-3 mb-20 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-150">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-40 rounded-lg"></div>
        <div className="absolute bottom-10 left-2 text-white font-black text-sm md:text-lg p-2 w-full text-left rounded-t-lg mb-3 md:mb-0">
          {uppercaseMovieName}
        </div>
        <div className="flex absolute bottom-4 left-2 text-gray-200 font-normal text-xs md:text-sm p-2 w-full text-left rounded-t-lg">
          {langArray[langKey].Rating}: {roundedRating}
          <GoDotFill className="size-3 m-1" />
          {year}
          <GoDotFill className="size-3 m-1" />
          {uppercaseLanguage}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
