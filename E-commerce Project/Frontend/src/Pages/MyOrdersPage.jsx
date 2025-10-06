import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slice/orderSlice";
const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <h3 className=" ml-2 text-xl font-semibold mb-4">My Orders</h3>
      <div>
        <table className="min-w-full rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Image",
                "Order ID",
                "Created",
                "Shipping Address",
                "Items",
                "Total",
                "Status",
              ].map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="border-b hover:border-gray-50 cursor-pointer"
              >
                {/* First product image */}
                <td className="px-4 py-2 text-sm">
                  <img
                    src={order.orderItems[0]?.image}
                    alt="order"
                    className="w-24 h-20 object-cover rounded-md"
                  />
                </td>

                {/* Order ID */}
                <td className="px-4 py-2 text-sm">{order._id}</td>

                {/* Created date */}
                <td className="px-4 py-2 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* Shipping Address */}
                <td className="px-4 py-2 text-sm">
                  {order.shippingAddress?.address},{" "}
                  {order.shippingAddress?.city}
                </td>

                {/* Total items */}
                <td className="px-4 py-2 text-sm">{order.orderItems.length}</td>

                {/* Total Price */}
                <td className="px-4 py-2 text-sm">₹{order.totalPrice}</td>

                {/* Status */}
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      order.isDelivered
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
