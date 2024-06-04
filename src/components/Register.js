import React, { useEffect, useState } from "react";
import Header from "./Header";
import checkValidateData from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../utils/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const imagesListRef = ref(storage, "images/");

  const handlePhotoUpload = () => {
    if (image == null) return;
    const imageRef = ref(storage, `images/${image.name + Date.now()}`);
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        getDownloadURL(imageRef) // Get download URL of the uploaded image
          .then((url) => {
            setImageUrl(url); // Set the URL in state variable
          })
          .catch((error) => {
            toast.error(`Error getting download URL: ${error}`);
          });
      })
      .catch((error) => {
        toast.error(`Error getting download URL: ${error}`);
      });
  };

  useEffect(() => {
    handlePhotoUpload();
  }, [image]);

  const handleRegisterButton = () => {
    try {
      const message = checkValidateData(email, password);
      setErrorMessage(message);

      toast.warning(message, { theme: "dark" });

      if (message != null) return;

      let user;
      createUserWithEmailAndPassword(auth, email, password) // all this api code is from firbase authentication docs  (https://firebase.google.com/docs/auth/web/password-auth)
        .then((userCredential) => {
          // Signed up

          user = userCredential.user;

          console.log(imageUrl);
          updateProfile(user, {
            displayName: name,
            photoURL: imageUrl,
          })
            .then(() => {
              // Profile updated!
              // we will again dispatch the userSlice for name and photo
              dispatch(
                addUser({
                  uid: user.uid,
                  email: user.email,
                  displayName: name,
                  photoURL: imageUrl,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
              toast.error(errorMessage);
            });

          console.log("user", user);
          // all the dispatches are there in app.js
          toast.success("Account created Successfully", { theme: "dark" });

          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);

          toast.error(errorMessage, { theme: "dark" });
        });
    } catch (error) {
      console.log("error", error.message);
      navigate("/error");
      toast.error("Error in Creating Account", { theme: "dark" });
    }
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
        className="absolute p-12 m-10 d-flex bg-black w-4/12 my-32 mx-auto right-0 left-0 text-white bg-opacity-70"
      >
        <h1 className="mb-6 text-3xl font-bold">Register</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Name"
          className="bg-black rounded-md border border-slate-600 p-3 m-2 w-full bg-opacity-70"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email Address"
          className="bg-black rounded-md border border-slate-600 p-3 m-2 w-full bg-opacity-70"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="bg-black rounded-md border border-slate-600 p-3 m-2 w-full bg-opacity-70"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="bg-black rounded-md border border-slate-600 p-3 m-2 w-full bg-opacity-70"
          // required
        />

        <button
          onClick={handleRegisterButton}
          className="p-2 m-2 mt-6 w-full font-semibold rounded-md bg-red-600"
        >
          Register
        </button>

        <p className="text-gray-400 mt-3 ml-2">
          Already have an Account?{" "}
          <a href="/" className="text-white"> // /login
            Sign In now.
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
