import express from "express";

import { signin, signup, updateUser } from "../controllers/UserController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update/:userId", updateUser)

export default router;

