import express from "express";

import { getUserTasks, createTasks, updateTask, deleteTask } from "../controllers/PostTaskController.js";

// Not required for now
//import auth from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/:userId", getUserTasks);
router.post("/:userId", createTasks);
router.patch("/:userId/:taskId", updateTask);
router.delete("/:userId/:taskId", deleteTask);

export default router;