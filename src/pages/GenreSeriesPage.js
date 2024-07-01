import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";
import MovieCard from "../components/MovieCard";
import { toast } from "react-toastify";
import { API_OPTIONS } from "../utils/constants";
import { useParams } from "react-router-dom";
import Spinner from "../shimmer/Spinner";
import { FaArrowUp } from "react-icons/fa";

const GenreSeriesPage = () => {
  const langKey = useSelector((state) => state.language.lang);
  const mediaType = useSelector((state) => state.mediaType.type);

  const { id: selectedGenre } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const ScrollToTopButton = () => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    return (
      <button
        className="fixed bottom-7 md:bottom-14 right-10 bg-gray-700 hover:bg-red-500 text-white py-3 md:py-4 px-3 md:px-4 rounded-full shadow-lg"
        onClick={scrollToTop}
      >
        <FaArrowUp className="size-4 md:size-6" />
      </button>
    );
  };

  useEffect(() => {
    const fetchSeriesByGenre = async () => {
      const todayDate = new Date().toISOString().split("T")[0];
      setIsFetching(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&screened_theatrically=true&release_date.lte=${todayDate}&sort_by=${sortBy}&with_genres=${selectedGenre}&page=${page}`,
          API_OPTIONS
        );

        if (!response.ok) {
          toast.error("Network response was not ok");
          return;
        }

        const data = await response.json();

        setSeries((prevSeries) => [...prevSeries, ...data.results]);
        setTotalPages(data.total_pages);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching series by genre");
        setIsLoading(false);
      } finally {
        setIsFetching(false);
      }
    };

    fetchSeriesByGenre();
  }, [selectedGenre, mediaType, page, sortBy]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 100 &&
        !isLoading &&
        page < totalPages
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, page, totalPages]);

  useEffect(() => {
    setIsLoading(true);
    setSeries([]);
    setPage(1);
  }, [selectedGenre, mediaType, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setIsLoading(true);
    setSeries([]);
    setPage(1);
  };

  return (
    <>
      <div className="bg-gray-900 to-black min-h-screen w-full flex flex-col">
        <Header />
        <div className="flex flex-col mt-20 md:mt-0 py-10">
          <div className="flex items-center justify-between md:pl-4 ml-10 md:ml-28 md:mt-20 md:mb-20">
            <div className="border-l-4 pl-4 border-red-500 text-white text-lg md:text-4xl font-bold">
              Series: {langArray[langKey].Genre}
            </div>
            <div className="flex items-center space-x-4 mr-10 md:mr-28">
              <span className="text-white font-bold hidden md:inline text-xs md:text-base">
                Sort by:
              </span>
              <select
                className="bg-gray-800 text-gray-200 text-xs md:text-base px-1 md:px-4 py-2 md:py-3 rounded-md focus:border-none"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="popularity.desc">Most Popular</option>
                <option value="popularity.asc">Least Popular</option>
                <option value="vote_average.desc">Top Rated</option>
                <option value="vote_average.asc">Least Rated</option>
                <option value="first_air_date.desc">Newest</option>
                <option value="first_air_date.asc">Oldest</option>
                <option value="name.asc">A-Z</option>
                <option value="name.desc">Z-A</option>
              </select>
            </div>
          </div>
          <div className="mx-auto mt-7 md:mt-0 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-14">
              {isLoading && page === 1 ? (
                <div>.</div>
              ) : (
                series.map((serie) => (
                  <MovieCard
                    key={serie.id}
                    mediaId={serie.id}
                    rating={serie.vote_average}
                    date={serie.release_date || serie.first_air_date}
                    language={serie.original_language}
                    mediaName={serie.name}
                    mediaTitle={serie.title}
                    name={serie.name || serie.title}
                    posterPath={serie.poster_path}
                    type={serie.media_type}
                  />
                ))
              )}
              {isFetching && (
                <div className="text-2xl text-gray-600">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default GenreSeriesPage;
