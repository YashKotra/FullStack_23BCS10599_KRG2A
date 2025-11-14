import React from "react";
import { Link } from "react-router-dom";
import { Globe, Truck, Star, ShieldCheck } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="relative w-full h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">ABOUT US</h1>
          <p className="text-lg md:text-xl font-light">
            Style That Speaks. Comfort That Lasts.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At <span className="font-semibold">Clothing.</span>, we believe
            fashion is more than just outfits—it’s a way to express yourself.
            Our journey started with one goal: to bring effortless style,
            comfort, and confidence into everyday lives. From timeless basics to
            bold statements, our pieces are crafted for the modern explorer.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            What started as a small vision is now a growing brand trusted by
            customers worldwide, delivering fashion that goes beyond trends.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb"
          alt="Our Story"
          className="rounded-2xl shadow-lg"
        />
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Vision & Mission</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Our vision is to redefine fashion by blending comfort with style,
            making it accessible to everyone across the globe. <br /> Our
            mission is to create quality clothing that inspires confidence,
            supports self-expression, and connects people through
            style—delivered with world-class customer service.
          </p>
        </div>
      </section>

      {/* USP Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Clothing.?</h2>
        <div className="grid md:grid-cols-4 gap-10">
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <Globe className="mx-auto w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Worldwide Reach</h3>
            <p className="text-gray-600">
              We ship to customers around the world with fast and reliable
              delivery.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <Truck className="mx-auto w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p className="text-gray-600">
              Your favorite outfits delivered at your doorstep without delays.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <Star className="mx-auto w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              Crafted with care to ensure comfort, durability, and style.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <ShieldCheck className="mx-auto w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trusted Brand</h3>
            <p className="text-gray-600">
              We value trust and transparency, building long-term customer
              relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://media.gettyimages.com/id/2151781606/photo/new-york-new-york-chris-hemsworth-attends-the-2024-met-gala-celebrating-sleeping-beauties.jpg?s=612x612&w=0&k=20&c=vjaStZEI39bAG_UDLMM7E_-hpwG8T61VNYx710eplSY="
            alt="Founder"
            className="rounded-2xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold mb-6">Meet the Founder</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold">Clothing.</span> was founded by{" "}
              <span className="font-semibold">Yash Kotra</span>, a passionate
              creator and tech enthusiast. With experience in building
              innovative platforms and a love for design, he started this
              journey to make stylish, affordable fashion accessible worldwide.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://in.linkedin.com/in/yash-kotra"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/YashKotra"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <div className="text-center py-20 bg-red-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Discover the Collection
        </h2>
        <p className="mb-6 text-lg">
          Blending comfort, style, and confidence for every occasion.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
