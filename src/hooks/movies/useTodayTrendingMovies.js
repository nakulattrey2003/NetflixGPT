import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTodayTrendingMovies } from "../../redux/moviesSlice";
import { API_OPTIONS } from "../../utils/constants";

const useTodayTrendingMovies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todayTrendingMovies = useSelector(
    (state) => state.movies.todayTrendingMovie
  );

  const getTodayTrendingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day",
        API_OPTIONS
      );

      const data = await response.json();

      dispatch(addTodayTrendingMovies(data.results));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!todayTrendingMovies) getTodayTrendingMovies();
  }, []);
};

export default useTodayTrendingMovies;
