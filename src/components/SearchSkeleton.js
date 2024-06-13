import React from "react";

const Skeleton = () => {
  return (
    <div className="bg-gray-900 to-black min-h-screen w-full flex flex-col">
      <div className="bg-gray-800 shadow-md">
        <div className="container mx-auto py-6 px-4">
          <div className="flex items-center justify-between">
            <div className="text-white text-4xl font-bold">
              Loading Search Results...
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(24)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col"
            >
              <div className="h-64 bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(24)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col"
            >
              <div className="h-64 bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(24)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col"
            >
              <div className="h-64 bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(24)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col"
            >
              <div className="h-64 bg-gray-700 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
