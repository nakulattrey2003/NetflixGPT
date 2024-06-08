import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addCastDetail } from "../redux/detailSlice";

const useCastDetail = (movieId) => {
  const dispatch = useDispatch();

  const getCastDetail = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      API_OPTIONS
    );

    const data = await response.json();

    dispatch(addCastDetail(data));

  };

  useEffect(() => {
    // if (movieId) {
      getCastDetail();
    // }
  }, [movieId]);
};

export default useCastDetail;
