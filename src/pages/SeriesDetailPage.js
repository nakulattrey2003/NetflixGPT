import React from "react";
import uesSeriesDetail from "../hooks/series/useSeriesDetail";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieOverview from "../components/MovieOverview";
import MovieList from "../components/MovieList";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";
import { useParams } from "react-router-dom";
import SeriesOverview from "../components/SeriesOverview";
import useCastSeriesDetail from "../hooks/series/useCastSeriesDetail";

const SeriesDetailPage = () => {
  const { id: mediaId } = useParams();

  const langKey = useSelector((state) => state.language.lang);
  const movies = useSelector((store) => store.movies);
  const series = useSelector((store) => store.series);

  const relatedTitle = langArray[langKey].Related;
  const todayTrendingTitle = langArray[langKey].TodayTrending;
  const topRatedTitle = langArray[langKey].TopRated;
  const upcomingTitle = langArray[langKey].Upcoming;

  uesSeriesDetail(mediaId);
  useCastSeriesDetail(mediaId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <SeriesOverview />
        <div>
          <MovieList title={relatedTitle} movies={series.popularSeries} />
          <MovieList
            title={todayTrendingTitle}
            movies={series.todayTrendingMovies}
          />
          <MovieList title={topRatedTitle} movies={series.topRatedSeries} />
          <MovieList title={upcomingTitle} movies={series.upcomingSeries} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SeriesDetailPage;
