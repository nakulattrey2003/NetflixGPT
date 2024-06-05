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

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

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

        navigate("/browse"); // if user is logged in than take it to browse page
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
            <img
              className="mt-4 w-12 h-12 rounded-full object-cover"
              src={user.photoURL}
              alt="dp"
            />
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
