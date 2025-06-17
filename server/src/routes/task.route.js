import express from "express";
import {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create Task
router.post("/create", createTask);

// Get All Tasks for Logged-in User
router.get("/all",  getUserTasks);

// Update Task by ID
router.put("/update/:id",  updateTask);

// Delete Task by ID
router.delete("/delete/:id", deleteTask);

export default router;