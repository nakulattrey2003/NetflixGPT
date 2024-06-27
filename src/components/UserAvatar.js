import React, { useState } from "react";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";
import UserModal from "../components/UserModal.js"

const UserAvatar = () => {

  const user = useSelector((state) => state.user);
  const langKey = useSelector((state) => state.language.lang);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const name = user.displayName;
  const firstName = name.split(" ")[0];

  const handleUserAvatarClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div onClick={handleUserAvatarClick} className="flex cursor-pointer">
      <div className="mt-4 hidden md:hidden lg:inline font-semibold text-xs md:text-base text-white pl-3 pt-3 pb-3 pr-2 hover:text-red-500">
        {langArray[langKey].Howdy} {user.displayName}!
      </div>
      <div>
        <img
          className="md:mt-4 md:ml-0 w-7 h-7 md:w-12 md:h-12 rounded-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
          src={user.photoURL}
          alt="dp"
        />
      </div>
      {isModalOpen && <UserModal />}
    </div>
  );
};

export default UserAvatar;
