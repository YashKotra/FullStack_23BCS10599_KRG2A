import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slice/productSlice";
import { addToCart } from "../../redux/slice/cartSlice";
import ProductGrid from "./ProductGrid";

const ProductDetail = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { similarProducts, selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImg, setMainImg] = useState(null); // ✅ updated from ""
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  const product = selectedProduct;

  useEffect(() => {
    if (product?.images?.[0]?.url) {
      setMainImg(product.images[0].url);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart", {
        duration: 1000,
      });
      return;
    }

    setButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart!", {
          duration: 1000,
        });
      })
      .catch(() => {
        toast.error("Error adding product to cart.");
      })
      .finally(() => {
        setButtonDisabled(false);
      });
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  if (loading || !product || Object.keys(product).length === 0) {
    return <p className="text-center p-10">Loading product...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6 mt-3">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Thumbnails (Desktop) */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {product.images?.map((image, idx) => (
              image.url && (
                <img
                  key={idx}
                  src={image.url}
                  alt={image.alt || product.name}
                  onClick={() => setMainImg(image.url)}
                  className={`w-32 h-32 object-cover rounded-lg cursor-pointer border-2 ${
                    mainImg === image.url ? "border-black" : "border-gray-300"
                  }`}
                />
              )
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2 flex">
            {mainImg ? (
              <img
                src={mainImg}
                alt={product.images?.[0]?.alt || product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-400">Image not available</p>
              </div>
            )}
          </div>

          {/* Mobile Thumbnails */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {product.images?.map((image, idx) => (
              image.url && (
                <img
                  key={idx}
                  src={image.url}
                  alt={product.name}
                  onClick={() => setMainImg(image.url)}
                  className={`w-32 h-32 object-cover rounded-lg cursor-pointer border-2 ${
                    mainImg === image.url ? "border-black" : "border-gray-300"
                  }`}
                />
              )
            ))}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {product.name}
            </h1>

            {product.price && (
              <p className="text-lg text-gray-600 mb-1 line-through text-red-800">
                ₹{product.price}
              </p>
            )}

            <p className="text-xl text-gray-700 mb-2 ml-1">
              ₹{product.discountPrice}
            </p>
            <p className="text-md text-gray-600 mb-4">{product.description}</p>

            {/* Color */}
            {product.colors?.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color
                          ? "ring-2 ring-offset-2 ring-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-700">Sizes:</p>
                <div className="flex gap-2 mt-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border transition-all duration-150 ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={handleDecrement}
                  className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-800 hover:text-white"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-800 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-3 px-6 rounded w-full mb-4 ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-600"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "ADD TO CART"}
            </button>

            {/* Characteristics */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  {product.brand && (
                    <tr>
                      <td className="py-1 font-medium">Brand</td>
                      <td className="py-1">{product.brand}</td>
                    </tr>
                  )}
                  {product.material && (
                    <tr>
                      <td className="py-1 font-medium">Material</td>
                      <td className="py-1">{product.material}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid
            products={similarProducts}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
