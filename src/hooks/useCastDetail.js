import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addCastDetail } from "../redux/detailSlice";

const useCastDetail = () => {
  const dispatch = useDispatch();
  const movieId = 653346;

  const getCastDetail = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      API_OPTIONS
    );

    const data = await response.json();

    dispatch(addCastDetail(data));
  };

  useEffect(() => {
    getCastDetail();
  }, []);

  return <div></div>;
};

export default useCastDetail;
