import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "sonner";

import LoginImg from "../../src/assets/login.webp";
import { loginUser } from "../redux/slice/authSlice";
import { mergeCart } from "../redux/slice/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading, error } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect param or default to "/"
  const redirectParam =
    new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirectParam.includes("checkout");

  // Handle successful login or cart merge
  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        // Only send guestId
        dispatch(mergeCart({ guestId }))
          .unwrap()
          .then(() => {
            navigate(isCheckoutRedirect ? "/checkout" : "/");
          })
          .catch((err) => {
            console.error("Cart merge error:", err);
            navigate(isCheckoutRedirect ? "/checkout" : "/");
          });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  // Show error messages via Sonner toast
  useEffect(() => {
    if (error) {
      toast.error(error); // Will show "Email does not exist" or "Incorrect password"
    }
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      {/* Sonner Toaster */}
      <Toaster position="top-right" />

      <div className="flex mb-4">
        {/* Left: Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-2">
          <div className="max-w-md w-full p-4 bg-white rounded-3xl shadow-md text-center">
            <h1 className="pb-6 font-bold text-3xl text-gray-800">Sign In</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="text-left">
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full p-3 border rounded-lg shadow-md border-gray-300 placeholder:text-base focus:scale-105 transition duration-300 ease-in-out"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="text-left">
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-md border-gray-300 placeholder:text-base focus:scale-105 transition duration-300 ease-in-out"
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 text-white bg-black rounded-lg shadow-lg mt-6 hover:scale-105 transition duration-300 ease-in-out"
              >
                {loading ? "Loading..." : "SIGN IN"}
              </button>
            </form>

            {/* Register Link */}
            <div className="flex flex-col items-center justify-center mt-4 text-sm">
              <p>
                <span className="text-gray-600">Don't have an account? </span>
                <Link
                  className="text-blue-500 hover:underline"
                  to={`/register?redirect=${encodeURIComponent(redirectParam)}`}
                >
                  Register
                </Link>
              </p>
            </div>

            {/* Third-party Auth */}
            <div className="flex flex-wrap items-center justify-center mt-5 gap-3">
              {[
                {
                  alt: "Google",
                  src: "https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/",
                },
                {
                  alt: "GitHub",
                  src: "https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/",
                },
                {
                  alt: "Apple",
                  src: "https://ucarecdn.com/3277d952-8e21-4aad-a2b7-d484dad531fb/",
                },
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="p-2 rounded-lg shadow-lg hover:scale-105 transition duration-300 ease-in-out"
                >
                  <img src={item.src} alt={item.alt} className="w-6 h-6" />
                </button>
              ))}
            </div>

            {/* Terms and Privacy */}
            <div className="mt-4 text-sm text-gray-500 text-center">
              <p>
                By signing in, you agree to our{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Right: Image Section */}
        <div className="hidden lg:flex w-full lg:w-1/2 h-full">
          <img
            src={LoginImg}
            alt="Login Visual"
            className="w-full h-[750px] object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
