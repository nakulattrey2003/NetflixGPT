// import React from "react";
// import Loader from "./Loader";

// const Skeleton = () => {
//   return (
//     <div className="flex h-screen w-screen items-center justify-center bg-gray-800">
//       <div
//         role="status"
//         className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
//       >
//         <div className="flex items-center justify-center w-full h-48 bg-gray-700 rounded sm:w-96">
//           <svg
//             className="w-10 h-10 text-gray-200"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 20 18"
//           >
//             <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
//           </svg>
//         </div>
//         <div className="w-full h-full space-y-4">
//           <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
//           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
//           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
//           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
//           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
//           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
//         </div>
//         <span className="sr-only">
//           <Loader />
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Skeleton;
import React from "react";

const Skeleton = () => {
  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 flex">
      {/* Left Side (Movie Poster Placeholder) */}
      <div className="flex-shrink-0 w-48 h-64 bg-gray-700 rounded-lg mr-6"></div>

      {/* Right Side (Movie Details) */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Top Section (Movie Title, Rating, Genre) */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-700 w-1/2"></div>
          <div className="h-4 bg-gray-700 w-1/4"></div>
          <div className="h-4 bg-gray-700 w-1/3"></div>
        </div>

        {/* Bottom Section (Movie Description) */}
        <div className="mt-4">
          <div className="h-4 bg-gray-700 w-full"></div>
          <div className="h-4 bg-gray-700 w-4/5 mt-2"></div>
          <div className="h-4 bg-gray-700 w-3/4 mt-2"></div>
          <div className="h-4 bg-gray-700 w-2/3 mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
