import { Link } from "react-router-dom";
const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p> Error:{error}</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="block"
        >
          <div className="bg-white p-4 rounded-xl hover:shadow-lg transition">
            <div className="w-full h-96 mb-4">
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
