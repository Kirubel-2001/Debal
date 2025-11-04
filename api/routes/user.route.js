import express from "express";
import { updateUser, deleteUser, getUser } from "../controller/user.controller.js";
import { verifyToken } from '../utils/verfyUser.js';

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;