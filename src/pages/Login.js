import React, { useState } from "react";
import Header from "../components/Header";
import checkValidateData from "../utils/validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginButton = () => {
    const message = checkValidateData(email, password);
    setErrorMessage(message);
    toast.warning(message, { theme: "dark" });

    if (message != null) return;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        toast.success("Logged in Successfully", { theme: "dark" });

        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " - " + errorMessage);

        toast.error("Login or Password Incorrect", { theme: "dark" });
      });
  };

  return (
    <div>
      <Header />

      <div className="absolute h-screen w-screen">
        <div className="absolute inset-0">
          <img
            src="https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg"
            alt="background"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 m-12 d-flex bg-black w-4/12 my-40 mx-auto right-0 left-0 text-white bg-opacity-70"
      >
        <h1 className="mb-6 text-3xl font-bold">Sign In</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="bg-black rounded-md border border-slate-600 p-3 m-2 w-full bg-opacity-70"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="bg-black rounded-md border border-slate-600 p-3 m-2 w-full bg-opacity-70"
        />
        {/* <p className="text-red-500 mt-3 ml-2">{errorMessage}</p> */}
        <button
          className="p-2 m-2 mt-6 w-full font-semibold rounded-md bg-red-600"
          onClick={handleLoginButton}
        >
          Sign in
        </button>
        <p className="text-gray-400 mt-3 ml-2">
          New to Netflix?{" "}
          <a href="/register" className="text-white">
            Sign up now.
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;