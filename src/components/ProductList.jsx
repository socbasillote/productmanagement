import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

function ProductList() {
  const products = useSelector((state) => state.products.list);
  const { list, loading } = useSelector((state) => state.products);

  if (loading) {
    return <p className="mt-6 text-gray-500">Loading Products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-gray-500 mt-6">No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
