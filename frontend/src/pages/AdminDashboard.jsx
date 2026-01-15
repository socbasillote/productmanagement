import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../features/admin/adminUserSlice";
import CreateUserForm from "../components/admin/CreateUserForm";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.adminUsers);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  // Protect UI
  if (user?.role !== "admin") {
    return <h2 className="p-6">Access Denied</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin User Management</h1>

      <CreateUserForm />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>

              <td className="p-2">
                <Link
                  to={`/admin/users/${u._id}/products`}
                  className="bg-blue-500 text-white px-2 py-1 mr-2"
                >
                  View Products
                </Link>

                <button>Delete</button>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
