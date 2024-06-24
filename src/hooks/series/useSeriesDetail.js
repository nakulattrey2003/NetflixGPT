import { useEffect } from "react";
import { API_OPTIONS } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addSeriesDetail } from "../../redux/detailSlice";
import { useNavigate } from "react-router-dom";

const useSeriesDetail = (seriesId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSeriesDetail = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/" + seriesId,
        API_OPTIONS
      );

      const data = await response.json();

      dispatch(addSeriesDetail(data));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getSeriesDetail();
  }, [seriesId]);
};

export default useSeriesDetail;
