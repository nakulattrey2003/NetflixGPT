import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import checkValidateData from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../utils/firebase";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loader from "../shimmer/Loader";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoUpload = () => {
    return new Promise((resolve, reject) => {
      if (!image) return resolve("");

      const imageRef = ref(storage, `images/${image.name + Date.now()}`);
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              resolve(url);
            })
            .catch((error) => {
              toast.error(`Error getting download URL: ${error}`);
              reject(error);
            });
        })
        .catch((error) => {
          toast.error(`Error uploading image: ${error}`);
          reject(error);
        });
    });
  };

  const handleRegisterButton = () => {
    const message = checkValidateData(email, password);
    setErrorMessage(message);
    toast.warning(message);

    if (message) return;
    setIsLoading(true);

    handlePhotoUpload()
      .then((url) => {
        return createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            const user = userCredential.user;

            return updateProfile(user, {
              displayName: name,
              photoURL: url,
            }).then(() => {
              dispatch(
                addUser({
                  uid: user.uid,
                  email: user.email,
                  displayName: name,
                  photoURL: url,
                })
              );
              toast.success("Account created Successfully");
              navigate("/browse");
            });
          }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(`${errorCode} - ${errorMessage}`);
        toast.error(errorMessage);
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
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute mt-16 p-5 md:p-12 m-10 d-flex bg-black w-5/6 md:w-7/12 lg:w-4/12 my-32 mx-auto right-0 left-0 text-white bg-opacity-70"
      >
        <h1 className=" mb-3 md:mb-6 text-lg md:text-3xl font-bold">Register</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Name"
          className="bg-black rounded-md border border-slate-600 text-sm md:text-base p-2 md:p-3 md:m-2 w-full bg-opacity-70 mb-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email Address"
          className="bg-black rounded-md border border-slate-600 text-sm md:text-base p-2 md:p-3 md:m-2 w-full bg-opacity-70 mb-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="bg-black rounded-md border border-slate-600 text-sm md:text-base p-2 md:p-3 md:m-2 w-full bg-opacity-70 mb-2"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="bg-black rounded-md border border-slate-600 text-sm md:text-base p-2 md:p-3 md:m-2 w-full bg-opacity-70 mb-2"
          // required
        />

        <button
          onClick={handleRegisterButton}
          className="text-sm md:text-base p-2 md:p-3 md:m-2 mt-3 md:mt-6 w-full font-semibold rounded-md bg-red-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader /> // Show spinner
          ) : (
            "Register"
          )}
        </button>

        <p className="text-gray-400 text-sm md:text-base mt-3 ml-2">
          Already have an Account?{" "}
          <Link to="/login" className="text-white">
            Sign In now.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
