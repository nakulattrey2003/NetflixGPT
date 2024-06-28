import { API_OPTIONS } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRelatedMovies } from "../../redux/moviesSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// it is fetching all the now playing movies from TMDB API and storing the data into the store
const useRelatedMovies = (movieId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const relatedMovies = useSelector((state) => state.movies.relatedMovies);

  const getRelatedMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?page=1`,
        API_OPTIONS
      );

      const data = await response.json();

      dispatch(addRelatedMovies(data.results));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getRelatedMovies();
  }, [movieId]);
};

export default useRelatedMovies;
