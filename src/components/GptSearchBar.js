import React, { useEffect, useState } from "react";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import langArray from "../utils/langConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptSearchResult } from "../redux/gptSearchSlice";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoMicOutline } from "react-icons/io5";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import api from "../utils/api";

const GptSearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { response, loading, error, fetchResponse } = api();
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setSearchInput(transcript);
    }
  }, [transcript]);

  const [searchInput, setSearchInput] = useState();
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const langKey = useSelector((state) => state.language.lang);
  const [toastWarning, setToastWarning] = useState(langArray[langKey].Warning1); // not working

  useEffect(() => {
    setToastWarning(langArray[langKey].Warning1);
  }, [langKey]);

  const searchMovie = async (movieName) => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movieName +
          "&include_adult=false&page=1",
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      toast.error("Error in Fetching Movies");
    }
  };

  const handleSearch = async () => {
    if (!searchInput || searchInput.length === 0) {
      toast.warning(toastWarning);
      return;
    }
    try {
      const gptQuery =
        "Act as a movie recomendation system and suggest some movies for the query " +
        searchInput +
        ". Only give me names of 7 movies, in one line and comma seperated with no inverted or double inverted commas.";
      // searchInput;

      console.log("Q:", gptQuery);

      const gptResults = await fetchResponse(gptQuery);

      console.log("A:", gptResults);

      const splitMovieResults = gptResults.split(",");

      const promiseArray = splitMovieResults.map((movie) => searchMovie(movie));

      const movieResults = await Promise.all(promiseArray);

      console.log("movieResults", movieResults);
      dispatch(addGptSearchResult(movieResults));

      setSearchInput("");

      navigate("/search");
    } catch (error) {
      toast.error("Error fetching response from Chat API");
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key == "Enter") {
      if (!searchInput || searchInput.length == 0) {
        toast.warning(toastWarning);
      } else {
        try {
          const gptQuery =
            "Act as a movie recomendation system and suggest some movies for the query " +
            searchInput +
            ". Only give me names of 7 movies, in one line and comma seperated with no inverted or double inverted commas.";
          // searchInput;

          console.log("Q:", gptQuery);

          const gptResults = await fetchResponse(gptQuery);

          console.log("A:", gptResults);

          const splitMovieResults = gptResults.split(",");

          const promiseArray = splitMovieResults.map((movie) =>
            searchMovie(movie)
          );

          const movieResults = await Promise.all(promiseArray);

          console.log("movieResults", movieResults);
          dispatch(
            addGptSearchResult({
              movieNames: splitMovieResults,
              movieResults: movieResults,
            })
          );

          setSearchInput("");

          navigate("/search");
        } catch (error) {
          toast.error("Error fetching response from Chat API", error.message);
        }
      }
    }
  };

  const handleInfoMouseEnter = () => {
    setShowInfoPopup(true);
  };

  const handleInfoMouseLeave = () => {
    setShowInfoPopup(false);
  };

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    }
    setIsListening(!isListening);
  };

  return (
    <div className="flex items-center bg-transparent border-gray-300 rounded-3xl px-4 py-2 w-full max-w-md">
      <FaSearch
        onClick={handleSearch}
        className="text-gray-300 mr-3 cursor-pointer size-4 hover:text-red-500"
      />
      <input
        className="outline-none bg-transparent w-full text-white placeholder-slate-300"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        onKeyDown={handleKeyPress}
        type="text"
        placeholder={langArray[langKey]?.GptSearchPlaceholder}
      />
      <div
        className="relative"
        onMouseEnter={handleInfoMouseEnter}
        onMouseLeave={handleInfoMouseLeave}
      >
        <IoIosInformationCircleOutline className="text-gray-300 size-6 cursor-pointer ml-2 hover:text-red-500" />
        {showInfoPopup && (
          <div className="absolute top-10 right-0 left-5 p-7 bg-gray-800 text-white rounded-lg shadow-lg w-[600px] z-10">
            <p>{langArray[langKey].PopupInfo}</p>
          </div>
        )}
      </div>
      <div>
        <div>
          {isListening ? (
            <FaMicrophone
              onClick={toggleListening}
              className="text-red-500 ml-2 size-5 cursor-pointer"
            />
          ) : (
            <IoMicOutline
              onClick={toggleListening}
              className="text-gray-300 ml-2 size-6 cursor-pointer hover:text-red-500"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GptSearchBar;
