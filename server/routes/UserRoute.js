import express from "express";
import auth from "../middleware/AuthMiddleware.js";

import { signin, signup, updateUser } from "../controllers/UserController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update/:userId", auth, updateUser)

export default router;

