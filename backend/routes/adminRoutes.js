import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
} from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/admin.js";

const router = express.Router();

// All routes are protected + admin only
router.post("/users", protect, admin, createUser);

router.get("/users", protect, admin, getUsers);

router.delete("/users/:id", protect, admin, deleteUser);

export default router;
