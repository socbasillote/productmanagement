import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/admin.js";
import {
  adminDeleteProduct,
  debugProducts,
  getUserProducts,
} from "../controllers/adminProductController.js";

const router = express.Router();

// All routes are protected + admin only
router.post("/users", protect, admin, createUser);

router.get("/users", protect, admin, getUsers);

router.delete("/users/:id", protect, admin, deleteUser);

// Get products of one user
router.get("/users/:userId/products", protect, admin, getUserProducts);

// Delete any product
router.delete("/products/:id", protect, admin, adminDeleteProduct);

router.get("/debug/products", protect, admin, debugProducts);

export default router;
