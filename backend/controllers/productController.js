import Product from "../models/Product.js";
import mongoose from "mongoose";

// GET
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// CREATE
export const createProduct = async (req, res) => {
  const productData = {
    ...req.body,
    image: req.file?.path, // Cloudinary URL
  };

  const product = new Product(productData);
  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔒 Guard: valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const updatedData = {
      name: req.body.name,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      category: req.body.category,
    };

    if (req.file) {
      updatedData.image = req.file.path; // Cloudinary URL
    }

    const updated = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
