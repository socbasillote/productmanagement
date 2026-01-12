import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  clearSelectedProduct,
  setError,
  setLoading,
  updateProduct,
} from "../features/products/productSlice";
import ImageUpload from "./ImageUpload";

function ProductForm() {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );
  const formRef = useRef(null);

  const { loading, error } = useSelector((state) => state.products);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  // Populat form in edit mode
  useEffect(() => {
    if (selectedProduct) {
      setForm(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (image) => {
    setForm((prev) => ({
      ...prev,
      image,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      dispatch(setError("Name and price are required."));
      return;
    }

    dispatch(setError(null));
    dispatch(setLoading(true));

    setTimeout(() => {
      if (form._id) {
        dispatch(updateProduct(form));
      } else {
        dispatch(
          addProduct({
            name: form.name,
            price: Number(form.price),
            stock: Number(form.stock),
            category: form.category,
            image: form.image,
          })
        );
      }
      dispatch(setLoading(false));
      handleCancel();
    }, 500);
    formRef.current.reset();
  };

  const handleCancel = () => {
    dispatch(clearSelectedProduct());
    setForm({
      _id: null,
      name: "",
      price: "",
      stock: "",
      category: "",
      image: "",
    });
  };

  return (
    <div>
      {error && <p className="mb-2 text-red-600 text-sm">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow"
        ref={formRef}
      >
        <h2 className="text-lg font-semibold">
          {form._id ? "Edit Product" : "Add Product"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="broder p-2 rounded"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <ImageUpload value={form.image} onChange={handleImageChange} />

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`mt-4 bg-blue-600 text-white px-4 py-2 rounded ${
                loading
                  ? "bg=gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : form._id ? "Update" : "Save"}
            </button>
            {form._id && (
              <button
                type="button"
                onClick={handleCancel}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
