import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-12 h-12">
        <div className="absolute border-4 border-t-4 border-red-500 rounded-full opacity-50 w-full h-full animate-ping"></div>
        <div className="absolute border-4 border-t-4 border-red-500 rounded-full opacity-70 w-full h-full animate-ping"></div>
        <div className="absolute border-4 border-t-4 border-red-500 rounded-full opacity-90 w-full h-full animate-ping"></div>
        <div className="absolute border-4 border-t-4 border-red-500 rounded-full w-full h-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Spinner;
