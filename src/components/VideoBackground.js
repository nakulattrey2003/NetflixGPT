import { useState } from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { IoVolumeMediumSharp, IoVolumeMute } from "react-icons/io5";

const VideoBackground = ({ movieId }) => {
  const [isMute, setIsMute] = useState(true);

  const trailerKey = useMovieTrailer(movieId);

  const handleMute = () => {
    setIsMute(!isMute);
  };

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerKey}?&modestbranding=1&autohide=1&autoplay=1&controls=0&showinfo=0&loop=1${
          isMute ? "&mute=1" : ""
        }&playlist=${trailerKey}`}
        title="Youtube Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>

      <button
        className="absolute bottom-28 right-16 z-10 p-4 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none"
        onClick={handleMute}
      >
        {isMute ? (
          <IoVolumeMute className="h-6 w-6" />
        ) : (
          <IoVolumeMediumSharp className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default VideoBackground;