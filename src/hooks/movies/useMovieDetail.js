import { useEffect } from "react";
import { API_OPTIONS } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieDetail } from "../../redux/detailSlice";
import { useNavigate } from "react-router-dom";

const useMovieDetail = (movieId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMovieDetail = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/" + movieId,
        API_OPTIONS
      );

      const data = await response.json();

      dispatch(addMovieDetail(data));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getMovieDetail();
  }, [movieId]);
};

export default useMovieDetail;
