import React from "react";

import { useDispatch, useSelector } from "react-redux";

import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import { useEffect } from "react";
import { fetchProducts } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const navigate = useNavigate();

  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Inventory Manager</h1>
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>

      <ProductForm />
      <ProductList />
    </div>
  );
}

export default Dashboard;
