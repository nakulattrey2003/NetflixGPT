import React from "react";
import Header from "../components/Header";
import useNowPlayingMovies from "../hooks/movies/useNowPlayingMovies";
import MainContainer from "../components/MainContainer";
import SecondaryContainer from "../components/SecondaryContainer";
import usePopularMovies from "../hooks/movies/usePopularMovies";
import useTopRatedMovies from "../hooks/movies/useTopRatedMovies";
import useUpcomingMovies from "../hooks/movies/useUpcomingMovies";
import Footer from "../components/Footer";
import useTodayTrending from "../hooks/useTodayTrending";


const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useTodayTrending();

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
