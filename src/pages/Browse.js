import React from "react";
import Header from "../components/Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "../components/MainContainer";
import SecondaryContainer from "../components/SecondaryContainer";

const Browse = () => {
  
  useNowPlayingMovies();
  

  return (
    <div>
      <Header />
      <MainContainer />      {/* the title and the video */}
      <SecondaryContainer /> {/* the arrays of movies list*/}
    </div>
  );
};

export default Browse;
