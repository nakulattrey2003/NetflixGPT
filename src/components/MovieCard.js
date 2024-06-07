import React from "react";
import { IMG_URL } from "../utils/constants";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";
import MovieDetailPage from "../pages/MovieDetailPage";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ rating, date, language, movieName, posterPath }) => {
  const navigate = useNavigate();

  const langKey = useSelector((state) => state.language.lang);

  const uppercaseMovieName = movieName.toUpperCase();
  const year = date.split("-")[2];
  const uppercaseLanguage = language.toUpperCase();
  const roundedRating = rating.toFixed(1);

  const handleMovieCardClick = () => {
    navigate("/movie-detail");
  }

  return (
    <div className="relative ml-3 mb-20">
      <div onClick={handleMovieCardClick} className="cursor-pointer w-52">
        <img
          className="rounded-lg"
          src={IMG_URL + posterPath}
          alt="Movie Card"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
        <div className="absolute bottom-10 left-2 text-white font-black text-lg p-2 w-full text-left rounded-t-lg">
          {uppercaseMovieName}
        </div>
        <div className="flex absolute bottom-4 left-2 text-gray-200 font-normal text-sm p-2 w-full text-left rounded-t-lg">
          {langArray[langKey].Rating}: {roundedRating}
          <GoDotFill className="size-3 m-1" />
          20{year}
          <GoDotFill className="size-3 m-1" />
          {uppercaseLanguage}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
