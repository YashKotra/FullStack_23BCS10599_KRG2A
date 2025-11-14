import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { RiLoopRightLine, RiSecurePaymentLine } from "react-icons/ri";

const Features = () => {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center p-6 rounded-lg ">
          <FiShoppingBag className="text-xl mb-4" />
          <h2 className="text-xl font-semibold uppercase mb-2 text-gray-700">
            Free International Shipping
          </h2>
          <p className="text-gray-600 max-w-xs">
            On all orders over <span className="font-semibold">₹1000</span>
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center p-6 rounded-lg ">
          <RiLoopRightLine className="text-xl mb-4" />
          <h2 className="text-xl font-semibold uppercase mb-2 text-gray-700">
            45 Days Return
          </h2>
          <p className="text-gray-600 max-w-xs">Money back guarantee</p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center p-6 rounded-lg ">
          <RiSecurePaymentLine className="text-xl mb-4" />
          <h2 className="text-xl font-semibold uppercase mb-2 text-gray-700">
            Secure Checkout
          </h2>
          <p className="text-gray-600 max-w-xs">
            100% secured checkout process
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
