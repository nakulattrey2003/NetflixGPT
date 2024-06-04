import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        toast.success("Logged Out Succesfully", { theme: "dark" });
        navigate("/login");
      })
      .catch((error) => {
        // An error happened
        toast.error("Error Logging Out", { theme: "dark" });
        navigate("/error");
      });
  };
  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix-logo"
      ></img>

        {user && (
          <div className="flex">
            <div className="mt-4 font-bold font-white pl-3 pt-3 pb-3 pr-2">
            Howdy {user.displayName}!
            </div>
            <div>
              <img className="mt-4 w-12 h-12 rounded-full" src={user.photoURL} alt="display-picture" />
            </div>
            <div className="m-4 pl-6 p-3">
              <button onClick={handleLogOut} className="font-bold text-red-600">
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
  );
};

export default Header;
