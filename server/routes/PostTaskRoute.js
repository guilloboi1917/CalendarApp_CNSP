import express from "express";

import { getUserTasks, createTasks, updateTask, deleteTask, shareTask, unshareTask } from "../controllers/PostTaskController.js";

// Not required for now
//import auth from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/:userId", getUserTasks);
router.post("/:userId", createTasks);
router.patch("/:userId/:taskId", updateTask);
router.delete("/:userId/:taskId", deleteTask);
router.patch("/:userId/:taskId/share", shareTask)
router.patch("/:userId/:taskId/unshare", unshareTask)

export default router;