import { useDispatch } from "react-redux";
import { selectProduct } from "../features/products/productSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="h-40 bg-gray-100 rounded mb-3 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>

      <div className="flex justify-between mt-2 text-sm">
        <span>₱{product.price}</span>
        <span>Stock: {product.stock}</span>
      </div>

      <button
        onClick={() => dispatch(selectProduct(product))}
        className="mt-3 w-full border border-blue-600 text-blue-600 rounded py-1 hover:bg-blue-50"
      >
        Edit
      </button>
    </div>
  );
}

export default ProductCard;
