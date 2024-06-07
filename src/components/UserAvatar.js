import React, { useState } from "react";
import { useSelector } from "react-redux";
import langArray from "../utils/langConstants";
import UserInfo from "./UserModal";

const UserAvatar = () => {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  const langKey = useSelector((state) => state.language.lang);

  const handleUserAvatarClick = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };

  const user = useSelector((state) => state.user);
  return (
    <div className="flex cursor-pointer">
      <div
        onClick={handleUserAvatarClick}
        className="mt-4 font-semibold text-white pl-3 pt-3 pb-3 pr-2"
      >
        {langArray[langKey].Howdy} {user.displayName}!
      </div>
      <div>
        <img
          onClick={handleUserAvatarClick}
          className="mt-4 w-12 h-12 rounded-full object-cover"
          src={user.photoURL}
          alt="dp"
        />
      </div>
      <div>{isUserInfoOpen && <UserInfo />}</div>
    </div>
  );
};

export default UserAvatar;
