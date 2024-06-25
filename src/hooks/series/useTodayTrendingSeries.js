import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTodayTrendingSeries } from "../../redux/seriesSlice";
import { API_OPTIONS } from "../../utils/constants";

const useTodayTrendingSeries = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todayTrendingSeries = useSelector(
    (state) => state.series.todayTrendingSeries
  );

  const getTodayTrendingSeries = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/tv/day",
        API_OPTIONS
      );

      const data = await response.json();

      dispatch(addTodayTrendingSeries(data.results));
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!todayTrendingSeries) getTodayTrendingSeries();
  }, []);
};

export default useTodayTrendingSeries;
