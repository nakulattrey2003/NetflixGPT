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
        setGenres([{ id: "", name: "Genres" }, ...data.genres]);
      } catch (error) {
        toast.error("Error fetching genres");
      }
    };

    fetchGenres();
  }, [mediaType]);

  useEffect(() => {
    const fetchMediaByGenre = async () => {
      if (!selectedGenre) return;

      const apiURL =
        mediaType === "movies"
          ? `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=${selectedGenre}`
          : `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&page=1&sort_by=popularity.desc&with_genres=${selectedGenre}`;

      try {
        const response = await fetch(apiURL, API_OPTIONS);

        if (!response.ok) {
          toast.error("Network response was not ok");
          return;
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        toast.error("Error fetching media by genre");
      }
    };

    fetchMediaByGenre();
  }, [selectedGenre, mediaType]);

  const handleGenreClick = (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
    if (genreId && mediaType === "movies") {
      navigate(`/genre-movie/${genreId}`);
    } else if (genreId && mediaType === "series") {
      navigate(`/genre-series/${genreId}`);
    }
  };

  return (
    <select
      onChange={handleGenreClick}
      className="relative hidden lg:inline mt-6 mr-4 hover:text-red-500 hover:font-bold top-1 left-0 text-white bg-transparent rounded-md outline-none border-none text-xs md:text-base opacity-90 z-10"
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
