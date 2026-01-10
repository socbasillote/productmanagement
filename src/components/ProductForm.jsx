import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  clearSelectedProduct,
  updateProduct,
} from "../features/products/productSlice";
import ImageUpload from "../components/ImageUpload";

function ProductForm() {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

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

    if (!form.name || !form.price) return;

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
    handleCancel();
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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
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
            className="mt-4 bg-blue-600 text-whtie px-4 py-2 rounded hover:bg-blue-700"
          >
            {form._id ? "Update" : "Save"}
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
  );
}

export default ProductForm;
