import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_OPTIONS } from "../utils/constants.js";

const GenreDropdown = () => {
  const navigate = useNavigate();
  const mediaType = useSelector((state) => state.mediaType.type);

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      const apiURL =
        mediaType === "movies"
          ? "https://api.themoviedb.org/3/genre/movie/list"
          : "https://api.themoviedb.org/3/genre/tv/list";

      try {
        const response = await fetch(apiURL, API_OPTIONS);

        if (!response.ok) {
          toast.error("Network response was not ok");
        }

        const data = await response.json();
        setGenres([{ id: "0", name: "Genres" }, ...data.genres]);
      } catch (error) {
        toast.error("Error fetching genres");
      }
    };

    fetchGenres();
  }, [mediaType]);

  const handleGenreClick = (e) => {
    const genreId = e.target.value;
    if (genreId != 0) setSelectedGenre(genreId);
    if (mediaType === "movies") {
      navigate(`/genre-movie/${genreId}`);
    } else if (mediaType === "series") {
      navigate(`/genre-series/${genreId}`);
    }
  };

  return (
    <select
      onChange={handleGenreClick}
      className="relative ml-2 md:-ml-6 md:mt-6 mr-1 hover:text-red-500 hover:font-bold md:top-1 left-0 text-white bg-transparent rounded-md outline-none border-none text-xs md:text-base opacity-90 z-10 w-16 md:w-24"
    >
      {genres.map((genre) => (
        <option
          className="bg-black md:p-2 md:m-2 text-xs md:text-base text-white"
          key={genre.id}
          value={genre.id}
        >
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default GenreDropdown;
