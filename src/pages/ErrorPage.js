import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate("/browse");
  }
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-900 text-white">
      <img
        className="mt-[-50px] h-80"
        src="/NetflixGPT Res/404 Error.png"
        alt="404 Error"
      />

      <p className="mt-[-60px] text-lg text-gray-300 mb-6">
        Uh-oh! It seems you've entered the wrong universe. <br />
        We couldn't find the page you're looking for.
      </p>
      <img
        className="w-64 h-auto rounded-lg shadow-lg mb-8"
        src="/NetflixGPT Res/Spiderman gif.gif"
        alt="Spider-Man"
      />
      <button onClick={handleGoBack} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-3">
        Go Back
      </button>
      <p className="text-lg text-gray-300 mb-20">
        Looks like Spider-Man is pointing at you, go back home!
      </p>
    </div>
  );
};

export default Error;
