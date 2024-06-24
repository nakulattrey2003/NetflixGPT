import React, { useEffect } from "react";
import { API_OPTIONS } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addCastSeriesDetail } from "../../redux/detailSlice";

const useCastSeriesDetail = (seiresId) => {
  const dispatch = useDispatch();

  const getCastSeriesDetail = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seiresId}/credits`,
      API_OPTIONS
    );

    const data = await response.json();

    dispatch(addCastSeriesDetail(data));
  };

  useEffect(() => {
    getCastSeriesDetail();
  }, [seiresId]);
};

export default useCastSeriesDetail;
