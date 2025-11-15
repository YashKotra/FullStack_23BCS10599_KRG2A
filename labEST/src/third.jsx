import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const baseClasses =
    "px-4 py-2 rounded font-medium text-sm transition";

  return (
    <nav className="flex gap-4 bg-white border-b shadow-sm p-4">
      
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${baseClasses} bg-green-600 text-white`
            : `${baseClasses} text-black hover:bg-gray-200`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? `${baseClasses} bg-green-600 text-white`
            : `${baseClasses} text-black hover:bg-gray-200`
        }
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? `${baseClasses} bg-green-600 text-white`
            : `${baseClasses} text-black hover:bg-gray-200`
        }
      >
        Contact
      </NavLink>

    </nav>
  );
};

export default Navbar;
