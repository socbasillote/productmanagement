function ProductCard({ product }) {
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
    </div>
  );
}

export default ProductCard;
