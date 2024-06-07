import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieDetails = () => {
  const movieId = 653346;

  const getMovieDetail = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      API_OPTIONS
    );

    const data = await response.json();
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return <div></div>;
};

export default useMovieDetails;
