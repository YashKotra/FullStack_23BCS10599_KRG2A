import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [newArrivals, setNewArrivals] = useState([]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="w-full py-10 bg-white-50">
        <div className="container mx-auto text-center relative px-4">
          <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover the latest styles straight off the runway, freshly added to
            keep your wardrobe on the cutting edge of fashion.
          </p>

          {/* Scroll Buttons */}
          <div className="absolute right-4 bottom-[-30px] flex space-x-2 z-10">
            <button
              onClick={() => handleScroll("left")}
              className="p-2 rounded border bg-white text-black shadow"
            >
              <FiChevronLeft className="text-2xl" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2 rounded border bg-white text-black shadow"
            >
              <FiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll scroll-smooth space-x-6 px-4 hide-scroll-bar"
        >
          {newArrivals.length === 0 ? (
            <p className="text-center w-full py-10 text-gray-500">Loading new arrivals...</p>
          ) : (
            newArrivals.map((product) => (
              <div
                key={product._id}
                className="relative min-w-[100%] sm:min-w-[50%] lg:min-w-[30%]"
              >
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  className="w-full h-[500px] object-cover rounded-lg"
                  draggable="false"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md text-white p-4 rounded-b-lg">
                  <Link to={`/product/${product._id}`} className="block">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="mt-1">₹{product.price}</p>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
