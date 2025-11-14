import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  updateUser,
  deleteUser,
  fetchUsers,
} from "../../redux/slice/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchUsers());
    }
  }, [user, navigate, dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [editingId, setEditingId] = useState(null);
  const [editingRole, setEditingRole] = useState("");

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleEditClick = (userId, currentRole) => {
    setEditingId(userId);
    setEditingRole(currentRole);
  };

  const handleEditSave = (userId) => {
    dispatch(updateUser({ id: userId, role: editingRole }));
    setEditingId(null);
    setEditingRole("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingRole("");
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure want to delete this user?")) {
      dispatch(deleteUser({ id: userId }));
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto h-screen">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Add User Form */}
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl mb-10">
        <h2 className="text-2xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleFormChange}
              className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white p-6 rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 capitalize">
                  {editingId === user._id ? (
                    <select
                      value={editingRole}
                      onChange={(e) => setEditingRole(e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option value="admin">Admin</option>
                      <option value="customer">Customer</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="py-3 px-4 space-x-2">
                  {editingId === user._id ? (
                    <>
                      <button
                        onClick={() => handleEditSave(user._id)}
                        className="bg-green-600 text-white rounded px-2 py-1 hover:bg-green-400"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="mt-1 bg-yellow-400 text-white rounded px-2 py-1 hover:bg-yellow-300"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(user._id, user.role)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="mt-1 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-400"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
