import Product from "../models/Product.js";

// Admin: Get products of specific user
export const getUserProducts = async (req, res) => {
  try {
    const userId = req.params.userId;

    const products = await Product.find({
      createdBy: userId,
    }).populate("createdBy", "name email");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete any product
export const adminDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product removed by admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const debugProducts = async (req, res) => {
  const all = await Product.find();
  res.json(all);
};
