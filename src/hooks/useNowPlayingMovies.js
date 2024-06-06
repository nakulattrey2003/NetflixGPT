import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../redux/moviesSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// it is fetching all the now playing movies from TMDB API and storing the data into the store
const useNowPlayingMovies = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    try 
    {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );

      const data = await response.json();

      dispatch(addNowPlayingMovies(data.results));
    } 
    catch (error) 
    {
      navigate("/error");
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
