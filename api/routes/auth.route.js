import express from "express";
import { signup, signin, signout, refreshToken } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/refresh", refreshToken);

export default router;