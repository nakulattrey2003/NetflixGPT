import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../../redux/moviesSlice";
import { API_OPTIONS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const randomPage = Math.floor(Math.random() * 5) + 1;

  const [page, setPage] = useState(randomPage);

  const topRatedMovies = useSelector((state) => state.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
        API_OPTIONS
      );

      const data = await response.json();
      dispatch(addTopRatedMovies(data.results));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!topRatedMovies) getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
