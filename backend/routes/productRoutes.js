import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, authorize("admin", "editor"), getProducts);
router.post(
  "/",
  protect,
  authorize("admin", "editor"),
  upload.single("image"),
  createProduct
);
router.put(
  "/:id",
  protect,
  authorize("admin", "editor"),
  upload.single("image"),
  updateProduct
);
router.delete("/:id", deleteProduct);

export default router;
