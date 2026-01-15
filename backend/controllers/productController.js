import Product from "../models/Product.js";
import mongoose from "mongoose";

// GET

export const getProducts = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const categoryFilter = req.query.category
    ? { category: req.query.category }
    : {};

  // 🔐 STRICT OWNERSHIP FILTER (NO ROLE EXCEPTIONS)
  const ownerFilter = {
    createdBy: req.user._id,
  };

  const filters = {
    ...keyword,
    ...categoryFilter,
    ...ownerFilter,
  };

  const count = await Product.countDocuments(filters);

  const products = await Product.find(filters)
    .populate("createdBy", "name email role")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
};

// CREATE
export const createProduct = async (req, res) => {
  const productData = {
    ...req.body,
    image: req.file?.path,
    createdBy: req.user._id, // Cloudinary URL
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
