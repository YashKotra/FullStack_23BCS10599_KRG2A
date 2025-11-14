import React, { useEffect, useState } from "react";
import Hero from "../Components/Layout/Hero";
import GenderCollectionSection from "../Components/Products/GenderCollectionSection";
import NewArrivals from "../Components/Products/NewArrivals";
import ProductDetail from "../Components/Products/ProductDetail";
import ProductGrid from "../Components/Products/ProductGrid";
import FeaturedCollection from "../Components/Products/FeaturedCollection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/productSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  const [likeProducts, setLikeProducts] = useState([]);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
      })
    );

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch best seller product", error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  useEffect(() => {
    const fetchLikeProducts = async () => {
      if (!bestSellerProduct) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`,
          {
            params: {
              gender: bestSellerProduct.gender,
              category: bestSellerProduct.category,
            },
          }
        );
        setLikeProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch like products", error);
      }
    };

    fetchLikeProducts();
  }, [bestSellerProduct]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      <div className="flex justify-center my-10">
        <h2 className="text-3xl font-bold text-center">Best Seller</h2>
      </div>
      {bestSellerProduct ? (
        <ProductDetail productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4 mt-4">
          Top Wear for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />

        <FeaturedCollection />
      </div>
    </div>
  );
};

export default Home;
