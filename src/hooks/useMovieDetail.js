import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieDetail } from "../redux/detailSlice";

const useMovieDetail = (movieId) => {
  const dispatch = useDispatch();

  const getMovieDetail = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId,
      API_OPTIONS
    );

    const data = await response.json();

    dispatch(addMovieDetail(data));

    console.log('d', data)
  };

  useEffect(() => {
    if (movieId) {
      getMovieDetail();
    }
  }, [movieId]);

  return <div></div>;
};

export default useMovieDetail;
