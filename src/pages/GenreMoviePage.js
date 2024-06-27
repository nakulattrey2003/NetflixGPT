import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";
import MovieCard from "../components/MovieCard";
import { toast } from "react-toastify";
import { API_OPTIONS } from "../utils/constants";
import { useParams } from "react-router-dom";
import Spinner from "../shimmer/Spinner";import { FaArrowUp } from "react-icons/fa6";

const GenreMoviePage = () => {
  const langKey = useSelector((state) => state.language.lang);
  const mediaType = useSelector((state) => state.mediaType.type);

  const { id: selectedGenre } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [sortBy, setSortBy] = useState("popularity.desc"); // internally in link can be filtered

  const ScrollToTopButton = () => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    return (
      <button
        className="fixed bottom-14 right-10 bg-gray-700 hover:bg-red-500 text-white py-4 px-4 rounded-full shadow-lg"
        onClick={scrollToTop}
      >
          <FaArrowUp className="size-6" />
      </button>
    );
  };

  useEffect(() => {
    const fetchMediaByGenre = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&sort_by=${sortBy}&with_genres=${selectedGenre}&page=${page}`,
          API_OPTIONS
        );

        if (!response.ok) {
          toast.error("Network response was not ok");
          return;
        }

        const data = await response.json();

        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setTotalPages(data.total_pages);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching media by genre");
        setIsLoading(false);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMediaByGenre();
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
    setMovies([]);
    setPage(1);
  }, [selectedGenre, mediaType, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setIsLoading(true);
    setMovies([]);
    setPage(1);
  };

  return (
    <>
      <div className="bg-gray-900 to-black min-h-screen w-full flex flex-col">
        <Header />
        <div className="flex flex-col mt-20 md:mt-0 py-10">
          <div className="flex items-center justify-between md:pl-4 ml-10 md:ml-28 md:mt-20 md:mb-20">
            <div className="border-l-4 pl-4 border-red-500 text-white text-2xl md:text-4xl font-bold">
              Movies: {langArray[langKey].Genre}
            </div>
            <div className="flex items-center space-x-4 mr-10 md:mr-28">
              <span className="text-white font-bold">Sort by:</span>
              <select
                className="bg-gray-800 text-gray-200 px-4 py-3 rounded-md focus:border-none"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="popularity.desc">Most Popularity</option>
                <option value="popularity.asc">Least Popularity</option>
                <option value="vote_average.desc">Top Rated</option>
                <option value="vote_average.asc">Least Rated</option>
                <option value="release_date.desc">Newest</option>
                <option value="release_date.asc">Oldest</option>
              </select>
            </div>
          </div>
          <div className="mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-14">
              {console.log(movies)}
              {isLoading && page === 1 ? (
                <div>.</div>
              ) : (
                movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    mediaId={movie.id}
                    rating={movie.vote_average}
                    date={movie.release_date || movie.first_air_date}
                    language={movie.original_language}
                    movieName={movie.title || movie.name}
                    posterPath={movie.poster_path}
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

export default GenreMoviePage;
