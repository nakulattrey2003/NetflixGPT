import React, { useEffect, useState } from "react";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import langArray from "../utils/langConstants";
import fetchApiResponse from "../utils/api";

const GptSearchBar = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState();

  const langKey = useSelector((state) => state.language.lang);
  const [toastWarning, setToastWarning] = useState(langArray[langKey].Warning1); // not working

  useEffect(() => {
    setToastWarning(langArray[langKey].Warning1);
  }, [langKey]);

  const handleSearch = () => {
    if (!searchInput || searchInput.length == 0) {
      toast.warning(toastWarning);
    } else navigate("/search");
  };

  const handleKeyPress = async (e) => {
    if (e.key == "Enter") {
      if (!searchInput || searchInput.length == 0) {
        toast.warning(toastWarning);
      } else {
        try {
          console.log(searchInput);
          const gptResults = await fetchApiResponse(searchInput);
          setSearchInput("");

          console.log("gptResults", gptResults);

          // navigate("/search");
        } catch (error) {
          console.error(
            "Error fetching response from Hugging Face API:",
            error.response ? error.response.data : error.message
          );
          toast.error("Error fetching response from Hugging Face API");
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
