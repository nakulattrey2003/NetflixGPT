import React, { useEffect, useState } from "react";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import langArray from "../utils/langConstants";
import { textGeneration } from "@huggingface/inference";
import { HfInference } from "@huggingface/inference";
import { API_OPTIONS } from "../utils/constants";
import { addGptSearchResult } from "../redux/gptSearchSlice";
import api from "../utils/api";

const GptSearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { response, loading, error, fetchResponse } = api();

  const [searchInput, setSearchInput] = useState();

  const langKey = useSelector((state) => state.language.lang);
  const [toastWarning, setToastWarning] = useState(langArray[langKey].Warning1); // not working

  useEffect(() => {
    setToastWarning(langArray[langKey].Warning1);
  }, [langKey]);

  const searchMovie = async (movieName) => {
    try{
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

    } catch(error){
      toast.error("Error in Fetching Movies");
    }
  };

  const handleSearch = async () => {
    if (!searchInput || searchInput.length === 0) {
      toast.warning(toastWarning);
      return;
    }
    try {
      const movieResults = await searchMovie(searchInput);
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
            ". Only give me names of 5 movies, in one line and comma seperated with no inverted or double inverted commas.";
            // searchInput;

          console.log("Q:", gptQuery);

          const gptResults = await fetchResponse(gptQuery);

          console.log("A:", gptResults);

          const movieResults = await searchMovie(searchInput);
          dispatch(addGptSearchResult(movieResults));
          
          setSearchInput("");

          navigate("/search");
        } catch (error) {
          toast.error("Error fetching response from Chat API", error.message);
        }
      }
    }
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
      <FaMicrophone className="text-gray-300 ml-2 size-4 cursor-pointer hover:text-red-500" />
    </div>
  );
};

export default GptSearchBar;
