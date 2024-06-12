import React from "react";

const FilterDropdown = ({ onChange }) => {
  return (
    <select
      onChange={onChange}
      className="bg-gray-800 text-white p-2 focus:outline-none py-3 px-7 rounded-md ml-4"
    >
      <option value="default">Sort By</option>
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
      <option value="nearest">Nearest</option>
      <option value="highestRated">Highest Rated</option>
      <option value="popular">Popular</option>
    </select>
  );
};

export default FilterDropdown;
