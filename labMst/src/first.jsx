import React, { useState } from "react";

function CounterPage() {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count < 10) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Counter</h1>

      <div className="text-4xl font-bold mb-4">{count}</div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={decrement}
          disabled={count === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          -
        </button>
        <button
          onClick={increment}
          disabled={count === 10}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          +
        </button>
        <button
          onClick={reset}
          disabled={count === 0}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {count === 10 && (
        <p className="text-red-500 font-medium">Maximum limit reached</p>
      )}
    </div>
  );
}

export default CounterPage;
