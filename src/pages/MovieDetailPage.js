import React from "react";
import useMovieDetails from "../hooks/useMovieDetail";
import useCastDetail from "../hooks/useCastDetail";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MovieDetailPage = () => {
  useMovieDetails();
  useCastDetail();
  return (
    <div>
      <Header />
      {/* <Footer /> */}
    </div>
  );
};

export default MovieDetailPage;
