import React from "react";
import Header from "../components/Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "../components/MainContainer";
import SecondaryContainer from "../components/SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Footer from "../components/Footer";
import useTodayTrendingMovie from "../hooks/useTodayTrendingMovie";


const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTodayTrendingMovie();

  return (
    <div>
      <Header />
      <MainContainer /> {/* the title and the video */}
      <SecondaryContainer /> {/* the arrays of movies list*/}
      <Footer />
    </div>
  );
};

export default Browse;
