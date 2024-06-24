import { API_OPTIONS } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../../redux/moviesSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// it is fetching all the now playing movies from TMDB API and storing the data into the store
const useNowPlayingMovies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (state) => state.movies.nowPlayingMovies
  ); // With this line of code, we are memoizing our app V are making sure that if the now playing data is in the reducer, then we are not refetching it whenever we go to homepage. This reduces our api fetching and also reduces our time and Price.

  const getNowPlayingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );

      const data = await response.json();

      dispatch(addNowPlayingMovies(data.results));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!nowPlayingMovies) getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
