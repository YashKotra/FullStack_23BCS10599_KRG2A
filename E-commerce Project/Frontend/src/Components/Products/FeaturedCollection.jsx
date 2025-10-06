import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp";
import Features from "./Features";
const FeaturedCollection = () => {
  return (
    <div className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        {/* left content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="font-semibold text-lg text-gray-700 mb-2">
            Confort and Style
          </h2>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel made for your everday life
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Discover high-quality, comfortable clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great every
            day.
          </p>
          <Link
            to="/collections/all"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
        {/* Right Image */}
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="image"
            className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl "
          />
        </div>
      </div>
      <Features />
    </div>
  );
};

export default FeaturedCollection;
