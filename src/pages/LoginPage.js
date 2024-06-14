import React, { useState } from "react";
import Header from "../components/Header";
import checkValidateData from "../utils/validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../shimmer/Loader";
import { useDispatch } from "react-redux";
import { loadWatchlist } from "../redux/watchlistSlice";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginButton = () => {
    const message = checkValidateData(email, password);
    setErrorMessage(message);
    toast.warning(message);

    if (message != null) return;
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // dispatch(loadWatchlist());   // it takes all the watchlist data from localstorage to watchlist reducer array;

        toast.success("Logged in Successfully");

        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " - " + errorMessage);

        toast.error("Login or Password Incorrect");
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false
      });
  };

  return (
    <div>
      <Header />

      <div className="absolute h-screen w-screen">
        <div className="absolute inset-0">
          <img
            src="/NetflixGPT Res/Netflix Background.jpg"
            alt="background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute mt-44 md:mt-36 p-5 md:p-12 m-10 d-flex bg-black w-5/6 md:w-7/12 lg:w-4/12 my-32 mx-auto right-0 left-0 text-white bg-opacity-70"
      >
        <h1 className=" mb-3 md:mb-6 text-lg md:text-3xl font-bold">Sign In</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="bg-black rounded-md border border-slate-600 text-sm md:text-base p-2 md:p-3 md:m-2 w-full bg-opacity-70 mb-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="bg-black rounded-md border border-slate-600 text-sm md:text-base p-2 md:p-3 md:m-2 w-full bg-opacity-70 mb-2"
        />
        {/* <p className="text-red-500 mt-3 ml-2">{errorMessage}</p> */}
        <button
          className="text-sm md:text-base p-2 md:p-3 md:m-2 mt-3 md:mt-6 w-full font-semibold rounded-md bg-red-600"
          onClick={handleLoginButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader /> // Show spinner
          ) : (
            "Sign In"
          )}
        </button>
        <p className="text-gray-400 text-sm md:text-base mt-3 ml-2">
          New to Netflix?{" "}
          <Link to="/register" className="text-white">
            Sign up now.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
