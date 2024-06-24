import { API_OPTIONS } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingSeries } from "../../redux/seriesSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// it is fetching all the now playing movies from TMDB API and storing the data into the store
const useNowPlayingSeries = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nowPlayingSeries = useSelector(
    (state) => state.series.nowPlayingSeries
  ); // With this line of code, we are memoizing our app V are making sure that if the now playing data is in the reducer, then we are not refetching it whenever we go to homepage. This reduces our api fetching and also reduces our time and Price.

  const getNowPlayingSeries = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/on_the_air?page=1",
        API_OPTIONS
      );

      const data = await response.json();

      dispatch(addNowPlayingSeries(data.results));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!nowPlayingSeries) getNowPlayingSeries();
  }, []);
};

export default useNowPlayingSeries;
