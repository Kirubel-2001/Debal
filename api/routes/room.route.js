import express from 'express';
import { verifyToken } from '../utils/verfyUser.js';
import { createRoom, getAllRooms } from '../controller/room.controller.js';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();

// Create room with multiple image uploads (max 10 images)
router.post("/create", verifyToken, upload.array('images', 10), createRoom);
router.get("/rooms", getAllRooms);
// Delete room
// router.delete("/delete/:id", verifyToken, deleteRoom);

export default router;