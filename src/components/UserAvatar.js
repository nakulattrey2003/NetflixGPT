import React, { useState } from "react";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";
import UserModal from "../components/UserModal.js"

const UserAvatar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const langKey = useSelector((state) => state.language.lang);

  const handleUserAvatarClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const user = useSelector((state) => state.user);
  return (
    <div onClick={handleUserAvatarClick} className="flex cursor-pointer">
      <div className="mt-4 font-semibold text-white pl-3 pt-3 pb-3 pr-2">
        {langArray[langKey].Howdy} {user.displayName}!
      </div>
      <div>
        <img
          className="mt-4 w-12 h-12 rounded-full object-cover"
          src={user.photoURL}
          alt="dp"
        />
      </div>
      {isModalOpen && <UserModal />}
    </div>
  );
};

export default UserAvatar;
