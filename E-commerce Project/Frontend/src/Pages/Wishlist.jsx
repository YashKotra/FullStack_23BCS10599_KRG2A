import React from "react";

const Wishlist = () => {
  const wishlist = [
    {
      id: "PROD101",
      name: "Summer Dress",
      price: "$49.99",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1320&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "PROD102",
      name: "Leather Jacket",
      price: "$129.00",
      img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "PROD101",
      name: "Summer Dress",
      price: "$49.99",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1320&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "PROD102",
      name: "Leather Jacket",
      price: "$129.00",
      img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="overflow-x-scroll">
      <h3 className="text-xl font-semibold mb-4">Wishlist</h3>
      <div className="flex space-x-4 min-w-max">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-md p-4 shadow-sm"
          >
            <img
              className="w-[200px] h-[200px] lg:w-[350px] lg:h-[350px]"
              src={item.img}
              alt="wishlist"
            />
            <div className="text-lg font-medium">{item.name}</div>
            <div className="text-gray-600">{item.price}</div>
            <button className="mt-2 text-sm text-blue-500 hover:underline">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
