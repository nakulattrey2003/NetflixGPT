import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedSeries } from "../../redux/seriesSlice";
import { API_OPTIONS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const useTopRatedSeries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const randomPage = Math.floor(Math.random() * 5) + 1;

  const [page, setPage] = useState(randomPage);

  const topRatedSeries = useSelector((state) => state.movies.topRatedMovies);

  const getTopRatedSeries = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?page=${page}`,
        API_OPTIONS
      );

      const data = await response.json();
      dispatch(addTopRatedSeries(data.results));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!topRatedSeries) getTopRatedSeries();
  }, []);
};

export default useTopRatedSeries;
