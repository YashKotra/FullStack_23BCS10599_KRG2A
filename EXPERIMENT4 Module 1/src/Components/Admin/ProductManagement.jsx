import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts, deleteProduct } from "../../redux/slice/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the product?")) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading)
    return <p className="text-center py-6 text-blue-600">Loading...</p>;

  if (error)
    return <p className="text-center py-6 text-red-500">Error: {error}</p>;

  return (
    <div className="flex-1 p-6 overflow-y-auto h-screen">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      <div className="bg-white p-6 rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-4">{product.stock}</td>
                  <td className="py-3 px-4 space-x-2">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-300"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      disabled={loading}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-400 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
