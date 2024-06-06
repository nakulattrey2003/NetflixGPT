import React from 'react'
import { useSelector } from 'react-redux';
import langArray from "../utils/langConstants";

const UserAvatar = () => {

  const langKey = useSelector((state) => state.language.lang);
    
  const user = useSelector((state) => state.user);
  return (
    <div className="flex">
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
    </div>
  );
}

export default UserAvatar