import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../redux/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const getTopRatedMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?page=1",
          API_OPTIONS
        );

        const data = await response.json();
        dispatch(addTopRatedMovies(data.results));
      } catch (error) {
        navigate("/error");
      }
    };

  useEffect(() => {
    getTopRatedMovies();
  }, []);

};

export default useTopRatedMovies;
