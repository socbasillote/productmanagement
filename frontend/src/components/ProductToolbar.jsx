export default function ProductToolbar({
  keyword,
  setKeyword,
  category,
  setCategory,
}) {
  return (
    <div className="flex gap-4 mb-4">
      <input
        className="border p-2 rounded w-full"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="books">Books</option>
      </select>
    </div>
  );
}
