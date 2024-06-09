import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ element, type }) => {
  const user = useSelector((state) => state.user);

  // If the route is private and the user is logged in, allow access
  if (type === "private") {
    if (user) {
      // User is logged in, allow access to the private route
      return element;
    } else {
      // User is not logged in, redirect to the login page
      return <Navigate to="/login" />;
    }
  }

  // If the route is public and the user is not logged in, allow access
  if (type === "public") {
    if (!user) {
      // User is not logged in, allow access to the public route
      return element;
    } else {
      // User is logged in, redirect to the browse page
      return <Navigate to="/browse" />;
    }
  }

  // If the route type is not recognized, just render the element
  return element;
};

export default ProtectRoute;
