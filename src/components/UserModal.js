import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../redux/userSlice";
import langArray from "../utils/langConstants";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const UserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const langKey = useSelector((state) => state.language.lang);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      dispatch(removeUser());
      toast.success(
        langArray[langKey].LogOutSuccess || "Logged Out Successfully"
      );
      navigate("/login");
    } catch (error) {
      toast.error(langArray[langKey].LogOutError || "Error logging out");
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-gray-800 p-4 rounded-lg shadow-lg w-5/12 h-5/6">
        <div className="m-2 absolute top-2 right-2">
          <button
            onClick={handleClose}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <IoClose size={28} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center text-white">
          <div className="m-4 font-bold text-3xl">{user.displayName}</div>
          <div className="mb-8 ">
            <img
              className="rounded-full h-56 w-56 object-cover"
              src={user.photoURL}
              alt="dp"
            />
          </div>
          <div className="mb-7 text-xl">Email : {user.email}</div>
          <div className="flex gap-6">
            <button
              onClick={handleLogOut}
              className="mt-4 w-36 bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
            >
              {langArray[langKey].LogOut}
            </button>
            <button
              onClick={handleClose}
              className="mt-4 w-36 bg-transparent hover:bg-red-700 text-red-500 hover:text-white font-bold py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >
              {langArray[langKey].Close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
