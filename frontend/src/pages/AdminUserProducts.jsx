import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  adminDeleteProduct,
  fetchUserProducts,
} from "../features/admin/adminProductSlice";

function AdminUserProducts() {
  const { userId } = useParams();

  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchUserProducts(userId));
  }, [dispatch, userId]);

  const handleDelete = (id) => {
    if (window.confirm("Delete product?")) {
      dispatch(adminDeleteProduct(id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Products</h2>

      {loading && <p>Loading...</p>}
      {products.length === 0 && !loading && (
        <p>No products found for this user</p>
      )}

      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border p-3">
            {p.image && <img src={p.image} className="h-32 object-cover" />}

            <h3 className="font-bold">{p.name}</h3>

            <p>${p.price}</p>
            <p>{p.email}</p>

            <button
              onClick={() => handleDelete(p._id)}
              className="bg-red-500 text-white px-2 py-1 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUserProducts;
