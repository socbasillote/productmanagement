import React from "react";

import { useDispatch, useSelector } from "react-redux";

import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import { useEffect } from "react";
import { fetchProducts } from "../features/products/productSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);

  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Inventory Manager</h1>

      <ProductForm />
      <ProductList />
    </div>
  );
}

export default Dashboard;
