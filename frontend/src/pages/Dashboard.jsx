import React from "react";

import { useSelector } from "react-redux";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

function Dashboard() {
  const products = useSelector((state) => state.products.list);

  console.log(products);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Inventory Manager</h1>

      <ProductForm />
      <ProductList />
    </div>
  );
}

export default Dashboard;
