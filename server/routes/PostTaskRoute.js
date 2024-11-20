import express from "express";
import auth from "../middleware/AuthMiddleware.js";

import { getUserTasks, createTasks, updateTask, deleteTask, shareTask, unshareTask } from "../controllers/PostTaskController.js";


const router = express.Router();

router.get("/:userId", auth, getUserTasks);
router.post("/:userId", auth, createTasks);
router.patch("/:userId/:taskId",auth, updateTask);
router.delete("/:userId/:taskId", auth, deleteTask);
router.patch("/:userId/:taskId/share", auth, shareTask)
router.patch("/:userId/:taskId/unshare", auth, unshareTask)

export default router;