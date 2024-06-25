import React from "react";
import Header from "../components/Header";
import useNowPlayingMovies from "../hooks/movies/useNowPlayingMovies";
import MainContainer from "../components/MainContainer";
import SecondaryContainer from "../components/SecondaryContainer";
import usePopularMovies from "../hooks/movies/usePopularMovies";
import useTopRatedMovies from "../hooks/movies/useTopRatedMovies";
import useUpcomingMovies from "../hooks/movies/useUpcomingMovies";
import Footer from "../components/Footer";
import useTodayTrendingMovies from "../hooks/movies/useTodayTrendingMovies";
import useTodayTrendingSeries from "../hooks/series/useTodayTrendingSeries";
import usePopularSeries from "../hooks/series/usePopularSeries";
import useTopRatedSeries from "../hooks/series/useTopRatedSeries";
import useNowPlayingSeries from "../hooks/series/useNowPlayingSeries";
import useUpcomingSeries from "../hooks/series/useUpcomingSeries";

const Browse = () => {
  useTodayTrendingMovies();
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  useTodayTrendingSeries();
  useNowPlayingSeries();
  usePopularSeries();
  useTopRatedSeries();
  useUpcomingSeries();

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
