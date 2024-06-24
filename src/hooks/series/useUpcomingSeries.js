import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingSeries } from "../../redux/seriesSlice";
import { API_OPTIONS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const useUpcomingSeries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const upcomingSeries = useSelector((state) => state.series.upcomingSeries);

  const getUpcomingSeries = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/airing_today?page=1",
        API_OPTIONS
      );

      const data = await response.json();
      dispatch(addUpcomingSeries(data.results));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!upcomingSeries) getUpcomingSeries();
  }, []);
};

export default useUpcomingSeries;
