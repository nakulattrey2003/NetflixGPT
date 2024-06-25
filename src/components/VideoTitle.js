import React, { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";
import useMovieTrailer from "../hooks/movies/useMovieTrailer";
import ReactPlayer from "react-player";
import useSeriesTrailer from "../hooks/series/useSeriesTrailer";

const VideoTitle = ({ title, overview, language, rating, date, mediaId }) => {
  const langKey = useSelector((state) => state.language.lang);
  
  const trailerKey = useMovieTrailer(mediaId);

  const [playing, setPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const lessInfoText = langArray[langKey].LessInfo || "Less Info";
  const moreInfoText = langArray[langKey].MoreInfo || "More Info";

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

  const roundedRating = rating.toFixed(1);

  const upperCaseLanguage = language.toUpperCase();

  return (
    <div>
      <div className="pt-[14%] md:pt-[30%] lg:pt-[14%] p-5 md:p-12 absolute text-gray-50 bg-gradient-to-r from-black w-screen aspect-video">
        <div className="p-2 m-2 -mt-5 text-xl md:text-4xl lg:text-5xl font-black break-words w-6/12">
          {title}
        </div>
        <div className="flex p-2 ml-2 md:ml-0 md:m-2 -mt-5 md:-mt-2 text-[8px] md:text-base">
          <FaStar className="mr-1 md:mt-1" />
          <span className="mr-4">{roundedRating}</span>
          <GoDotFill className="hidden md:block size-2 md:size-4 md:mr-3 mt-1" />
          <MdDateRange className="md:mt-1 mr-1" />
          <span className="mr-4">{date}</span>
          <GoDotFill className="hidden md:block size-2 md:size-4 md:mr-3 mt-1" />
          <span>{upperCaseLanguage} - HD</span>
        </div>
        <div
          className="p-2 hidden md:hidden lg:block -mt-5 md:-mt-2 m-2 text-xs md:text-lg w-6/12 break-words text-slate-200 cursor-pointer"
          onClick={handleExpand}
        >
          {isExpanded ? overview : splitOverview(overview, 20)}
        </div>
        <div className="flex">
          <div>
            <button
              onClick={handlePlay}
              className="flex ml-4 mr-3 bg-gray-200 hover:bg-gray-300 text-black font-black py-1 px-2 text-[8px] md:text-base md:py-2 md:px-4 rounded"
            >
              <FaPlay className="text-[8px] md:text-base mt-[2px] md:mt-1 mr-2" />{" "}
              {langArray[langKey].Play}
            </button>
          </div>
          <div>
            <button
              className="hidden md:hidden lg:flex bg-gray-500 hover:bg-gray-600 bg-opacity-50 hover:bg-opacity-50 text-white font-bold hover:text-white py-2 px-4 hover:border-transparent rounded"
              onClick={handleExpand}
            >
              <CiCircleInfo className="mr-2 h-6 w-6" />{" "}
              {isExpanded ? lessInfoText : moreInfoText}
            </button>
          </div>
        </div>
      </div>
      {/* Trailer Preview */}
      {playing && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <ReactPlayer
            url={`https://www.youtube.com/embed/${trailerKey}`} // Replace with your video URL
            playing={playing}
            controls={true}
            // light={true}
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

export default VideoTitle;
