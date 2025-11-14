import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RazorPayButton from "./RazorPayButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slice/checkoutSlice";
import axios from "axios";
import { setCheckout } from "../../redux/slice/checkoutSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [key, setKey] = useState("");
  const [orderId, setOrderId] = useState("");

  const cartProducts = cart?.products || [];

  const subtotal = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCharge = subtotal > 1000 ? 0 : 50;
  const totalCharge = subtotal + shippingCharge;

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [checkoutId, setCheckoutId] = useState(null);

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      try {
        const res = await dispatch(
          createCheckout({
            checkoutItems: cart.products,
            shippingAddress,
            paymentMethod: "Razorpay",
            totalPrice: totalCharge,
          })
        );
        if (res.payload && res.payload?.newCheckout?._id) {
          setCheckoutId(res.payload?.newCheckout?._id);
          const { id: orderId } = res.payload?.razorpayOrder;
          setOrderId(orderId);
          setKey(res.payload?.key);
        }
      } catch (err) {
        console.error("Checkout failed:", err);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
          razorpay_order_id: details.razorpay_order_id,
          razorpay_payment_id: details.razorpay_payment_id,
          razorpay_signature: details.razorpay_signature,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error("Payment success error:", error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      const finalOrder = response.data;
      dispatch(setCheckout(finalOrder));
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Finalize checkout error:", error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-normal uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full border p-2 rounded"
              disabled
              value={user ? user.email : ""}
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700" htmlFor="pinCode">
                Pincode
              </label>
              <input
                type="text"
                id="postalCode"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="phone">
              Contact Number
            </label>
            <input
              type="text"
              id="phone"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h2 className="text-lg mb-4">Pay with RazorPay</h2>
                <RazorPayButton
                  amount={totalCharge * 100}
                  onSuccess={handlePaymentSuccess}
                  razorpayKey={key}
                  orderId={orderId}
                  onError={() => alert("Payment Failed. Try Again.")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cartProducts.map((product) => (
            <div
              className="flex items-start justify-between py-2 border-b"
              key={product.productId}
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <h2 className="text-lg font-medium">
                ₹{product.price.toLocaleString("en-IN")}
              </h2>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between py-2 text-lg font-medium mb-4">
          <p>Subtotal</p>
          <p>₹{subtotal.toLocaleString("en-IN")}</p>
        </div>
        <div className="flex items-center justify-between py-2 text-lg font-medium mb-4">
          <p>Shipping</p>
          <p>{shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}</p>
        </div>
        <div className="border-t py-4 mb-4">
          <div className="flex items-center justify-between py-2 text-lg font-medium mb-4">
            <p>Total</p>
            <p>₹{totalCharge.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
