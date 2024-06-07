import React from "react";
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
import { SUPPORTED_LANGUAGES } from "../utils/constants.js";
import UserAvatar from "./UserAvatar.js";
import { changeLanguage } from "../redux/languageSlice.js";
import langArray from "../utils/langConstants.js";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const langKey = useSelector((state) => state.language.lang);

  const handleLogoClick = () => {
    navigate("/browse");
  };

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

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        toast.success("Logged Out Succesfully");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened
        toast.error("Error Logging Out");
        navigate("/error");
      });
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        onClick={handleLogoClick}
        className="w-44"
        src="/NetflixGPT Res/Netflix Logo.png"
        alt="netflix-logo"
      ></img>

      {user && (
        <div className="flex ml-24 w-full justify-between">
          <GptSearchBar />

          <div className="flex">
            <select
              onChange={handleLanguageChange}
              className="text-white p-2 m-2 outline-none border-none rounded bg-transparent mr-10"
            >
              {SUPPORTED_LANGUAGES.map((it) => (
                <option
                  className="bg-black opacity-100 p-2 m-2 text-white"
                  key={it.identifier}
                  value={it.identifier}
                >
                  {it.name}
                </option>
              ))}
            </select>

            <UserAvatar />

            <div className="m-3 pl-8 p-2">
              <button
                onClick={handleLogOut}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                {langArray[langKey].LogOut}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
