import React, { useEffect } from "react";
import { API_OPTIONS } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addCastMovieDetail } from "../../redux/detailSlice";

const useCastMovieDetail = (movieId) => {
  const dispatch = useDispatch();

  const getCastMovieDetail = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      API_OPTIONS
    );

    const data = await response.json();

    dispatch(addCastMovieDetail(data));
  };

  useEffect(() => {
    getCastMovieDetail();
  }, [movieId]);
};

export default useCastMovieDetail;
