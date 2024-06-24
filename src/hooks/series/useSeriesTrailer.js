import { useEffect, useState } from "react";
import { API_OPTIONS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const useSeriesTrailer = (seiresId) => {
  const navigate = useNavigate();

  const [trailerKey, setTrailerKey] = useState(null);

  const fetchTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${seiresId}/videos?language=en-US`,
        API_OPTIONS
      );
      const data = await response.json();
      const allTrailers = data.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = allTrailers.length ? allTrailers[0] : data.results[0]; // if my data does not have any type="Trailer" then play the first video you have founded
      setTrailerKey(trailer ? trailer.key : null);
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    fetchTrailer();
  }, [seiresId, navigate]);

  return trailerKey;
};

export default useSeriesTrailer;
