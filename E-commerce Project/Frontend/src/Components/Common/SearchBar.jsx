import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setFilters,
  fetchProductsByFilters,
} from "../../redux/slice/productSlice";
const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: search }));
    dispatch(fetchProductsByFilters({ search: search }));
    navigate(`/collections/all?search=${search}`);
    setIsOpen(false);
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex items-center justify-center transition-all duration-300 ${
        isOpen
          ? "absolute top-0 left-0 w-full bg-white h-24 z-50 px-4"
          : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Search..."
              className="bg-gray-100 px-4 py-2 pr-28 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-10 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition"
            >
              Search
            </button>

            <button
              type="button"
              onClick={handleSearchToggle}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              aria-label="Close search"
            >
              <HiMiniXMark className="h-5 w-5" />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={handleSearchToggle}
          className="text-gray-700 hover:text-black"
          aria-label="Open search"
        >
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
