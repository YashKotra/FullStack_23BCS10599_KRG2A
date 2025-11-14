import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className="min-h-screen md:flex md:flex-row relative">
      {/* Top Bar (Mobile Only) */}
      <div className="md:hidden p-4 bg-gray-900 text-white flex items-center">
        <button onClick={toggleSideBar}>
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSideBar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-gray-900 w-64 text-white absolute md:relative md:h-screen transform transition-transform duration-300 z-20
          ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block`}
      >
        <AdminSidebar toggleSideBar={toggleSideBar} />
      </div>

      {/* Main Content Area for Nested Routes */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
