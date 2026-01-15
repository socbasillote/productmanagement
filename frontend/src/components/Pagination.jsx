export default function Pagination({ page, pages, setPage }) {
  return (
    <div className="flex justify-center mt-6 gap-2">
      {[...Array(pages).keys()].map((x) => (
        <button
          key={x}
          onClick={() => setPage(x + 1)}
          className={`px-3 py-1 rounded ${
            page === x + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {x + 1}
        </button>
      ))}
    </div>
  );
}
