import { API_OPTIONS } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRelatedSeries } from "../../redux/seriesSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// it is fetching all the now playing movies from TMDB API and storing the data into the store
const useRelatedSeries = (seriesId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const relatedSeries = useSelector((state) => state.movies.relatedSeries);

  const getRelatedSeries = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/recommendations?page=2`,
        API_OPTIONS
      );

      const data = await response.json();

      dispatch(addRelatedSeries(data.results));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!relatedSeries) getRelatedSeries();
  }, [seriesId]);
};

export default useRelatedSeries;
