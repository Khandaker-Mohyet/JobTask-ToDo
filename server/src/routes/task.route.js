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
router.post("/", createTask);

// Get All Tasks for Logged-in User
router.get("/",  getUserTasks);

// Update Task by ID
router.put("/:id",  updateTask);

// Delete Task by ID
router.delete("/:id", deleteTask);

export default router;