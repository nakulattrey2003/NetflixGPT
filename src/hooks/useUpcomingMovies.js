import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../redux/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUpcomingMovies = async () => {
      try
      {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        API_OPTIONS
      );

      const data = await response.json();
      dispatch(addUpcomingMovies(data.results));
    }catch (error) {
      navigate("/error");
    }
    };

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  return <div></div>;
};

export default useUpcomingMovies;
