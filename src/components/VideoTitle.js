import React, { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";

const VideoTitle = ({ title, overview }) => {

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
  }

  return (
    <div>
      <div className="mt-8 p-12">
        <div className="p-2 m-2 text-5xl font-black break-words w-6/12">
          {title}
        </div>
        <div
          className="p-2 m-2 text-lg w-7/12 break-words text-slate-700 cursor-pointer"
          onClick={handleExpand}
        >
          {isExpanded ? overview : splitOverview(overview, 35)}
        </div>
        <div className="flex">
          <div>
            <button class="flex ml-4 mr-3 bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
              <FaPlay className="mt-1 mr-2" /> Play
            </button>
          </div>
          <div>
            <button class="flex bg-transparent hover:bg-gray-200 text-gray-800 font-bold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded" onClick={handleExpand}>
              <CiCircleInfo className="mr-2 h-6 w-6" /> {isExpanded ? "Less Info": "More Info"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
