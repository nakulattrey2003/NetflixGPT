import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <ThreeDots type="ThreeDots" color="#fff" height={30} width={30} />
    </div>
  );
};

export default Loader;
