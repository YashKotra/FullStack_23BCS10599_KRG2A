import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Counter: {count}</h2>

      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-3"
      >
        Increment
      </button>

      <button
        onClick={() => setCount(count - 1)}
        className="bg-red-600 text-white px-4 py-2 rounded mr-3"
      >
        Decrement
      </button>

      <button
        onClick={() => setCount(0)}
        className="bg-gray-700 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
