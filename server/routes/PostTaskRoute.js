import express from "express";

import { getTasks, createTasks, updateTask, deleteTask } from "../controllers/PostTaskController.js";
import auth from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", auth, createTasks);
router.patch("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;