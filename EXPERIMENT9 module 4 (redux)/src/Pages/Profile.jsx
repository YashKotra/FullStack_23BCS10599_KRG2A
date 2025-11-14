import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyOrdersPage from "../Pages/MyOrdersPage";
import Wishlist from "./Wishlist";
import { logout } from "../redux/slice/authSlice"; // <-- import logout action
import { clearCart } from "../redux/slice/cartSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // TODO: Define or fetch addresses for display
  const addresses = [
    // Example static data
    {
      id: 1,
      label: "Home",
      line1: "123 Main St",
      city: "Springfield",
      zip: "12345",
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  const handleDeleteAddress = (id) => {
    // TODO: Implement delete address functionality
    console.log("Delete address with id:", id);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 lg:px-16">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-semibold text-black">
                {user?.name}
              </h2>
              <p className="text-sm opacity-80 text-black">{user?.email}</p>
            </div>
          </div>
          <button className="text-white px-4 py-1 rounded bg-indigo-600 hover:bg-indigo-700">
            Edit Profile
          </button>
        </div>

        {/* Sections */}
        <div className="p-6 space-y-8">
          {/* Orders */}
          <MyOrdersPage />

          {/* Wishlist */}
          <Wishlist />

          {/* Addresses */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Saved Addresses</h3>
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="flex justify-between items-center border border-gray-200 rounded-md p-4"
                >
                  <div>
                    <div className="font-medium">{addr.label}</div>
                    <div className="text-gray-600">
                      {addr.line1}, {addr.city} - {addr.zip}
                    </div>
                  </div>
                  <button
                    className="text-sm text-red-500 hover:underline"
                    onClick={() => handleDeleteAddress(addr.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Add New Address
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
