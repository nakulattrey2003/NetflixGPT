import React, { useEffect, useState } from "react";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import langArray from "../utils/langConstants";

const GptSearchBar = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState();

  const langKey = useSelector((state) => state.language.lang);
  const [toastWarning, setToastWarning] = useState(langArray[langKey].Warning1);  // not working 

   useEffect(() => {
     setToastWarning(langArray[langKey].Warning1);
   }, [langKey]);

  const handleSearch = () => {
    if (!searchInput || searchInput.length == 0) {
      toast.warning(toastWarning);
    } else navigate("/search");
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      if (!searchInput || searchInput.length == 0) {
        toast.warning(toastWarning);
      } else navigate("/search");
    }
  };
  return (
    <div className="flex items-center bg-transparent border-gray-300 rounded-3xl px-4 py-2 w-full max-w-md">
      <FaSearch onClick={handleSearch} className="text-gray-300 mr-3 size-4" />
      <input
        className="outline-none bg-transparent w-full text-white placeholder-slate-300"
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyPress}
        type="text"
        placeholder={langArray[langKey]?.GptSearchPlaceholder}
      />
      <FaMicrophone className="text-gray-300 ml-2 size-4 pointer" />
    </div>
  );
};

export default GptSearchBar;
