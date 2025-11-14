import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import { FaBoxOpen, FaClipboardList, FaStore } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slice/cartSlice";
import { logout } from "../../redux/slice/authSlice";

const AdminSidebar = ({ toggleSideBar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  const menuItems = [
    { label: "Users", icon: <FaUsers />, path: "/admin/users" },
    { label: "Products", icon: <FaBoxOpen />, path: "/admin/products" },
    { label: "Orders", icon: <FaClipboardList />, path: "/admin/orders" },
    { label: "Shop", icon: <FaStore />, path: "/" },
    { label: "Settings", icon: <FaCog />, path: "/admin/settings" },
  ];

  return (
    <div className="h-full md:h-screen overflow-y-auto flex flex-col justify-between p-6 bg-gray-900 text-white">
      {/* Top section: Logo & Navigation */}
      <div>
        {/* Logo */}
        <div className="mb-6">
          <Link
            to="/admin"
            className="text-2xl font-semibold italic text-white"
          >
            Clothing.
          </Link>
        </div>

        {/* Dashboard title */}
        <h2 className="text-xl font-medium mb-6 flex items-center">
          <FaTachometerAlt />
          <span className="ml-2">Admin Dashboard</span>
        </h2>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                  : "text-gray-300 hover:bg-gray-800 py-3 px-4 rounded flex items-center space-x-2 transition"
              }
              onClick={toggleSideBar}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
