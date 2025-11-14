import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slice/cartSlice";
const CardContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();
  // handle adding or subtraction to the cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: delta,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };
  return (
    <div>
      {cart.products.map((product, idx) => (
        <div
          key={idx}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">Size: {product.size}</p>
              <p className="text-sm text-gray-600">Color: {product.color}</p>
              <button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    -1,
                    product.quantity,
                    product.size,
                    product.color
                  )
                }
                className="border rounded px-2 py-1 text-xl font-medium"
              >
                -
              </button>
              <span className="mx-4">{product.quantity}</span>
              <button
                onClick={() =>
                  handleAddToCart(
                    product.productId,
                    1,
                    product.quantity,
                    product.size,
                    product.color
                  )
                }
                className="border rounded px-2 py-1 text-xl font-medium"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">₹{product.price}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
            >
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardContents;
