import React, { useEffect, useState } from "react";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import langArray from "../utils/langConstants";
import { API_OPTIONS } from "../utils/constants";
import {
  addGptSearchResult,
  clearGptSearchResult,
} from "../redux/gptSearchSlice";
import { IoMicOutline } from "react-icons/io5";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import api from "../utils/api";
import { BsStars } from "react-icons/bs";
import { RiInformationLine } from "react-icons/ri";

const GptSearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fetchResponse } = api();
  const { transcript, resetTranscript } = useSpeechRecognition();

  const [searchInput, setSearchInput] = useState("");
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSearchTimer, setAutoSearchTimer] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAPIInput, setShowAPIInput] = useState(false);
  const [inputAPIValue, setInputAPIValue] = useState("");

  useEffect(() => {
    if (transcript) {
      setSearchInput(transcript);

      if (autoSearchTimer) {
        clearTimeout(autoSearchTimer);
      }
      setAutoSearchTimer(
        setTimeout(() => {
          handleSearch();
          setIsListening(!isListening);
          SpeechRecognition.stopListening();
          resetTranscript();
        }, 2000)
      );
    }
  }, [transcript]);

  const langKey = useSelector((state) => state.language.lang);
  const [toastWarning, setToastWarning] = useState(langArray[langKey].Warning1); // not working

  useEffect(() => {
    setToastWarning(langArray[langKey].Warning1);
  }, [langKey]);

  const handlePlusClick = () => {
    setShowAPIInput(!showAPIInput);
  };

  const handlePlusInputChange = (e) => {
    setInputAPIValue(e.target.value);
  };

  const searchMovie = async (mediaName) => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/search/multi?query=" +
          mediaName +
          "&include_adult=true&page=1",
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
        navigate("/error");
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      toast.error("Error in Fetching Movies from TMBD");
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&page=1`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const results = data.results.slice(0, 7);

      return results.map((result) => result.title || result.name);
    } catch (error) {
      toast.error("Error fetching suggestions");
      return [];
    }
  };

  const handleSearch = async () => {
    if (!searchInput || searchInput.length === 0) {
      toast.warning(toastWarning);
      return;
    }
    try {
      setIsLoading(true);
      // Clear previous search results before adding new ones
      dispatch(clearGptSearchResult());

      const gptQuery =
        "Act as a movie and series recomendation system and suggest some movies and series for the query " +
        searchInput +
        ". Also include " +
        searchInput +
        " in the list if it exists .Only give me names of 7 movies or series according to query, in one line and comma seperated with no inverted or double inverted commas.";
      // searchInput;

      console.log("Q:", gptQuery);

      const gptResults = await fetchResponse(gptQuery, inputAPIValue);

      console.log("A:", gptResults);

      let splitMovieResults = [];

      if (gptResults) {
        splitMovieResults = gptResults.split(",");
      } else {
        splitMovieResults = [searchInput];
      }

      const promiseArray = splitMovieResults.map((movie) => searchMovie(movie));

      const movieResults = await Promise.all(promiseArray);

      dispatch(
        addGptSearchResult({
          movieNames: splitMovieResults,
          movieResults: movieResults,
        })
      );

      setSearchInput("");
      setShowSuggestions(false);
      resetTranscript();
      navigate("/search");
    } catch (error) {
      toast.error("Error fetching response from Chat API");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = async (value) => {
    setSearchInput(value);
    setShowAPIInput(false);
    setShowSuggestions(true);
    if (value.trim().length > 0) {
      const suggestions = await fetchSuggestions(value);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    handleSearch();
    setShowSuggestions(false);
  };

  {
    suggestions.map((item, index) => (
      <div key={index} onClick={() => handleSuggestionClick(item)}>
        {item}
      </div>
    ));
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    }
    setIsListening(!isListening);
  };

  return (
    <div className="flex text-xs md:text-base items-center bg-transparent border-gray-300 rounded-3xl px-4 py-2 -ml-5 md:-ml-6 w-full md:max-w-md">
      <BsStars
        onClick={handlePlusClick}
        className="relative text-gray-200 mr-2 cursor-pointer size-6 md:size-8 hover:text-red-500"
      />
      {showAPIInput && (
        <div className="absolute top-16 z-20 w-64 md:w-96">
          <div className="relative">
            <input
              type="text"
              value={inputAPIValue}
              onChange={handlePlusInputChange}
              className="absolute bg-gray-800 text-gray-300 border w-48 md:w-80 border-none focus:border-none rounded-md px-3 py-2 pr-14"
              placeholder="Enter Your Gemini Api Key..."
            />

            <button
              onClick={handlePlusClick}
              className="absolute right-2 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <FaSearch
        onClick={handleSearch}
        className="text-gray-300 mr-3 cursor-pointer size-5 md:size-6 hover:text-red-500"
      />
      <input
        className="outline-none bg-transparent w-full text-white placeholder-slate-300"
        onChange={(e) => handleInputChange(e.target.value)}
        value={searchInput}
        onKeyDown={handleKeyPress}
        type="text"
        placeholder={langArray[langKey]?.GptSearchPlaceholder}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 p-1 bg-black bg-opacity-80 text-white mt-80 w-96 shadow-lg rounded-xl">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 hover:text-red-500 hover:font-bold"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      <div
        className="relative"
        onMouseEnter={handleInfoMouseEnter}
        onMouseLeave={handleInfoMouseLeave}
      >
        <RiInformationLine className="text-gray-300 size-4 md:size-6 cursor-pointer ml-2 hover:text-red-500" />
        {showInfoPopup && (
          <div className="absolute top-10 md:left-5 p-7 bg-gray-800 text-white rounded-lg shadow-lg md:w-[600px] z-10">
            <p>{langArray[langKey].PopupInfo}</p>
          </div>
        )}
      </div>
      <div>
        <div>
          {isListening ? (
            <FaMicrophone
              onClick={toggleListening}
              className="text-red-500 ml-2 size-4 md:size-6 cursor-pointer"
            />
          ) : (
            <IoMicOutline
              onClick={toggleListening}
              className="text-gray-300 ml-2 size-4 md:size-6 cursor-pointer hover:text-red-500"
            />
          )}
        </div>
      </div>
      {/* {isLoading && <Loader />} */}
    </div>
  );
};

export default GptSearchBar;
