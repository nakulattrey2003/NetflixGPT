import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTodayTrendingMovie } from "../redux/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useTodayTrendingMovie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todayTrendingMovie = useSelector((state) => state.movies.todayTrendingMovie);

  const getTodayTrendingMovie = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        API_OPTIONS
      );

      const data = await response.json();

      dispatch(addTodayTrendingMovie(data.results));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if(!todayTrendingMovie) getTodayTrendingMovie();
  }, []);
};

export default useTodayTrendingMovie;
