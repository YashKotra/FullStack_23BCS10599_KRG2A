import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slice/orderSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No Order details found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{orderDetails._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
              <span
                className={`${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? "Paid" : "Pending"}
              </span>
              <span
                className={`${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending Delivered"}
              </span>
            </div>
          </div>
          {/* Customer payment shippig info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold  mb-2">Payment Info</h4>
              <p>Payment Method: {orderDetails.paymentMethod}</p>
              <p>Status: {orderDetails.isPaid ? "Paid" : "Pending"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold  mb-2">Shipping Info</h4>
              <p>Shipping Method: {orderDetails.shippingMethod}</p>
              <p>
                Address:{" "}
                {`${orderDetails.shippingAddress.address}, 
                ${orderDetails.shippingAddress.country}`}
              </p>
            </div>
          </div>
          {/* Product List */}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-4 ">Product</th>
                  <th className="px-2 py-4">Name</th>
                  <th className="px-2 py-4">Unit Price</th>
                  <th className="px-2 py-4">Quantity</th>
                  <th className="px-2 py-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((product) => (
                  <tr key={product.productId} className="border-b">
                    {/* Product Image */}
                    <td className="px-2 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-26 h-26 object-cover rounded-lg mr-4"
                      />
                    </td>

                    {/* Product Name */}
                    <td className="px-4 py-3">
                      <Link
                        to={`/product/${product.productId}`}
                        className="text-blue-500 font-medium hover:underline"
                      >
                        {product.name}
                      </Link>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 text-gray-700">
                      ₹{product.price}
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-3 text-gray-700">
                      {product.quantity}
                    </td>

                    {/* Total */}
                    <td className="px-4 py-3 text-gray-900 font-semibold">
                      ₹{product.price * product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Link to="/my-orders" className="text-blue-500 hover:underline">
              Back to My oders
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
