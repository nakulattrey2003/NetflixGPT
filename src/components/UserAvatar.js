import React from 'react'
import { useSelector } from 'react-redux';

const UserAvatar = () => {
    
  const user = useSelector((state) => state.user);
  return (
    <div className='flex'>
      <div className="mt-4 font-semibold text-white pl-3 pt-3 pb-3 pr-2">
        Howdy {user.displayName}!
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