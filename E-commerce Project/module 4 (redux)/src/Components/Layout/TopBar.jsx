import React from "react";
import { FaInstagram, FaXTwitter, FaMeta } from "react-icons/fa6";

const TopBar = () => {
  return (
    <div className="bg-[#ea2e0e] text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 text-sm">
        {/* Left: Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <FaMeta className="h-6 w-5" />
          </a>
          <a
            href="https://www.instagram.com/_iam.yash17__/"
            className="hover:text-gray-300"
          >
            <FaInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaXTwitter className="h-5 w-5" />
          </a>
        </div>

        {/* Center: Shipping Message */}
        <div className="text-center flex-grow">
          <span>We ship worldwide - Fast and reliable shipping!</span>
        </div>

        {/* Right: Phone Number */}
        <div className="text-sm hidden md:block ">
          <a href="tel:+917056XXXX" className="hover:text-gray-300">
            +91 XXXXXXXX
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
