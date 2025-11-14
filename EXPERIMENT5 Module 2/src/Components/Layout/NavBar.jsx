import React, { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Searchbar from "../Common/SearchBar";
import CartDrawer from "./CartDrawer";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce(
      (total, product) => total + Number(product.quantity || 0),
      0
    ) || 0;

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  return (
    <div className="container mx-auto flex px-6 py-4 justify-between items-center">
      <Link to="/" className="text-2xl font-bold italic">
        Clothing.
      </Link>

      {/* Center - Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link
          to="/collections/all?gender=Men"
          className="text-sm font-medium uppercase text-gray-700 hover:text-black"
        >
          MEN
        </Link>
        <Link
          to="/collections/all?gender=Women"
          className="text-sm font-medium uppercase text-gray-700 hover:text-black"
        >
          WOMEN
        </Link>
        <Link
          to="/collections/all?category=Top Wear"
          className="text-sm font-medium uppercase text-gray-700 hover:text-black"
        >
          TOP WEAR
        </Link>
        <Link
          to="/collections/all?category=Bottom Wear"
          className="text-sm font-medium uppercase text-gray-700 hover:text-black"
        >
          BOTTOM WEAR
        </Link>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        {user && user.role === "admin" && (
          <Link
            to="/admin"
            className="block bg-gray-800 text-white px-2 rounded-sm"
          >
            Admin
          </Link>
        )}

        <Link to="/profile" className="text-gray-700 hover:text-black">
          <HiOutlineUser className="h-6 w-6" />
        </Link>

        {/* Cart Icon with Badge */}
        <button
          onClick={toggleCartDrawer}
          className="relative text-gray-700 hover:text-black"
        >
          <HiOutlineShoppingBag className="h-6 w-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>

        <Searchbar />

        <button onClick={toggleNavDrawer} className="md:hidden">
          <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
