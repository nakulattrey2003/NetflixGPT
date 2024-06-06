import React, { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

const VideoTitle = ({ title, overview, language, rating, date }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
  const roundedRating = rating.toFixed(1);

  const upperCaseLanguage = language.toUpperCase();

  return (
    <div>
      <div className="pt-[14%] p-12 absolute text-gray-50 bg-gradient-to-r from-black w-screen aspect-video">
        <div className="p-2 m-2 -mt-5 text-5xl font-black break-words w-6/12">
          {title}
        </div>
        <div className="flex p-2 m-2 -mt-2">
          <FaStar className="mr-1 mt-1" />{" "}
          <span className="mr-4">{roundedRating}</span>
          <GoDotFill className="size-4 mr-3 mt-1" />
          <MdDateRange className="mt-1 mr-1" />
          <span className="mr-4">{date}</span>
          <GoDotFill className="size-4 mr-3 mt-1" />
          <span>{upperCaseLanguage} - HD</span>
        </div>
        <div
          className="p-2 -mt-2 m-2 text-lg w-6/12 break-words text-slate-200 cursor-pointer"
          onClick={handleExpand}
        >
          {isExpanded ? overview : splitOverview(overview, 20)}
        </div>
        <div className="flex">
          <div>
            <button class="flex ml-4 mr-3 bg-gray-200 hover:bg-gray-300 text-black font-black py-2 px-4 rounded">
              <FaPlay className="mt-1 mr-2" /> Play
            </button>
          </div>
          <div>
            <button
              class="flex bg-gray-500 hover:bg-gray-600 bg-opacity-50 hover:bg-opacity-50 text-white font-bold hover:text-white py-2 px-4 hover:border-transparent rounded"
              onClick={handleExpand}
            >
              <CiCircleInfo className="mr-2 h-6 w-6" />{" "}
              {isExpanded ? "Less Info" : "More Info"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
