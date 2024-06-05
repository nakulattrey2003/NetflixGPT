import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Browse from "./components/Browse";
import Register from "./pages/Register";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/utils/firebase.js";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./redux/userSlice";
import Error from "./components/Error.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // this api function is provided by the firebase which is called whenever user is logged in or logged out
      if (user) {
        // User is signed in
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          })
        );
      } else {
        // User is signed out
        dispatch(removeUser());
      }
    });
  }, []); // empty dependency array to call the function only once when page reloads;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
