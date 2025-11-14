import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Join Our Newsletter
          </h3>
          <p className="text-sm text-gray-400 mb-3">
            Get the latest news, trends and offers delivered to your inbox.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0"
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md text-sm bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white transition">
                Shop All
              </a>
            </li>
            <li>
              <a
                href="/collections/all?category=Top+Wear&gender=Men"
                className="hover:text-white transition"
              >
                Men’s Top Wear
              </a>
            </li>
            <li>
              <a
                href="/collections/all?category=Top+Wear&gender=Women"
                className="hover:text-white transition"
              >
                Women’s Top Wear
              </a>
            </li>
            <li>
              <a
                href="collections/all?category=Bottom+Wear&gender=Men"
                className="hover:text-white transition"
              >
                Men’s Bottom Wear
              </a>
            </li>
            <li>
              <a
                href="collections/all?category=Bottom+Wear&gender=Women"
                className="hover:text-white transition"
              >
                Women’s Bottom Wear
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/AboutUs" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/my-orders" className="hover:text-white transition">
                Order Status
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full transition"
                  aria-label="Social icon"
                >
                  <Icon size={18} className="text-white" />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Designed by{" "}
        <span className="text-white font-medium">Yash Kotra</span>. All rights
        reserved.
      </div>
    </footer>
  );
}
