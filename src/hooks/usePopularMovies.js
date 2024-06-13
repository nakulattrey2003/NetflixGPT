import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../redux/moviesSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// it is fetching all the now playing movies from TMDB API and storing the data into the store
const usePopularMovies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const popularMovies = useSelector((state) => state.movies.popularMovies);

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=2",
        API_OPTIONS
      );

      const data = await response.json();

      dispatch(addPopularMovies(data.results));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if(!popularMovies) getPopularMovies();
  }, []);
};

export default usePopularMovies;
