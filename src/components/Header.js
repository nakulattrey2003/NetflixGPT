import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice.js";
import GptSearchBar from "./GptSearchBar.js";
import { API_OPTIONS, SUPPORTED_LANGUAGES } from "../utils/constants.js";
import UserAvatar from "./UserAvatar.js";
import { changeLanguage } from "../redux/languageSlice.js";
import { changeMediaType } from "../redux/mediaTypeSlice.js";
import langArray from "../utils/langConstants.js";
import { loadWatchlist } from "../redux/watchlistSlice.js";
import GenreDropdown from "./GenreDropdown.js";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const langKey = useSelector((state) => state.language.lang);
  const mediaType = useSelector((state) => state.mediaType.type);

  const [toggleState, setToggleState] = useState("Series");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (user) {
      dispatch(loadWatchlist({ userId: user.uid }));
    }
  }, [user, dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // this api function is provided by the firebase which is called whenever user is logged in or logged out
      // we have made this function here beacuse header component is present all over our app.
      if (user) {
        // User is signed in
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );

        // navigate("/browse"); // if user is logged in than take it to browse page
      } else {
        // User is signed out
        dispatch(removeUser());
      }
    });
  }, []); // empty dependency array to call the function only once when page reloads;

  useEffect(() => {
    const fetchGenres = async () => {
      const apiURL =
        mediaType === "movies"
          ? "https://api.themoviedb.org/3/genre/movie/list"
          : "https://api.themoviedb.org/3/genre/tv/list";

      try {
        const response = await fetch(apiURL, API_OPTIONS);

        if (!response.ok) {
          toast.error("Network response was not ok");
        }

        const data = await response.json();
        setGenres([{ id: "", name: "Genres" }, ...data.genres]); // so that first name is genre
      } catch (error) {
        toast.error("Error fetching genres");
      }
    };

    fetchGenres();
  }, [mediaType]);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        // localStorage.removeItem("watchlist");
        toast.success("Logged Out Succesfully");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened
        toast.error("Error Logging Out");
        navigate("/error");
      });
  };

  const handleLogoClick = () => {
    navigate("/browse");
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleWatchlist = () => {
    navigate("/watchlist");
  };

  const handleMovieSeriesChange = () => {
    if (toggleState == "Series") {
      setToggleState("Movies");
      dispatch(changeMediaType("series"));
      navigate("/series");
    } else {
      setToggleState("Series");
      dispatch(changeMediaType("movies"));
      navigate("/browse");
    }
  };

  return (
    <div className="absolute w-full px-2 md:px-8 md:py-2 bg-gradient-to-b from-black/80 z-50 flex flex-col md:flex-row justify-evenly md:justify-between bg-transparent md:bg-transparent">
      {/* // bg-black is for small screen,  sm:bg-blue-100 will be for screen bigger than smaller and md:bg-green-100 will be for screen biffer than medium */}
      {/* so for small (by default what you write), sm for medium, md for large */}
      <img
        onClick={handleLogoClick}
        className="w-24 md:w-44 mx-auto mt-1 md:mx-0"
        src="/NetflixGPT Res/Netflix Logo.png"
        alt="netflix-logo"
      ></img>

      {user && (
        <div className="flex flex-col md:flex-row -mt-2 md:mt-0 ml-6 w-full md:justify-between">
          <GptSearchBar />

          <div className="flex justify-between">
            <div
              onClick={handleMovieSeriesChange}
              className="text-emerald-500  mt-1 md:mt-7 text-xs md:text-lg cursor-pointer ml-3 mr-1 md:mr-3 font-bold hover:font-bold hover:text-emerald-600"
            >
              {toggleState}
            </div>
            <div className="flex">
              <select
                onChange={handleLanguageChange}
                className="text-white hidden lg:inline -mt-5 md:p-2 m-1 -ml-5 md:m-4 outline-none border-none text-xs md:text-base rounded bg-transparent mr-1 md:mr-3 hover:text-red-500 hover:font-bold"
              >
                {SUPPORTED_LANGUAGES.map((it) => (
                  <option
                    className="bg-black opacity-0 md:p-2 md:m-2 text-xs md:text-base text-white"
                    key={it.identifier}
                    value={it.identifier}
                  >
                    {it.name}
                  </option>
                ))}
              </select>

              <div
                onClick={handleWatchlist}
                className="text-white mt-1 md:mt-7 text-xs md:text-base cursor-pointer -ml-3 md:ml-1 mr-1 md:mr-12 hover:font-bold hover:text-red-500"
              >
                {langArray[langKey].Watchlist}
              </div>

              <div className="relative">
                <GenreDropdown />
              </div>
            </div>

            <div className="flex">
              <UserAvatar />

              <div className="m-3 flex text-xs md:text-base md:pl-8 p-2">
                <button
                  onClick={handleLogOut}
                  className="bg-red-600 hover:bg-red-700 flex -mt-5 md:mt-0 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded mr-3 md:mr-0"
                >
                  {langArray[langKey].LogOut}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
