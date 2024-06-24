import { API_OPTIONS } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularSeries } from "../../redux/seriesSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// it is fetching all the now playing movies from TMDB API and storing the data into the store
const usePopularSeries = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const popularSeries = useSelector((state) => state.movies.popularSeries);

  const getPopularSeries = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?page=2",
        API_OPTIONS
      );

      const data = await response.json();

      dispatch(addPopularSeries(data.results));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!popularSeries) getPopularSeries();
  }, []);
};

export default usePopularSeries;
