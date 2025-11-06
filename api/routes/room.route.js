import express from 'express';
import { verifyToken } from '../utils/verfyUser.js';
import { createRoom, deleteRoom, getAllRooms, getMyRooms, updateRoom } from '../controller/room.controller.js';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();
// Public routes
router.get("/rooms", getAllRooms);

// Protected routes
router.post("/create", verifyToken, upload.array('images', 10), createRoom);
router.get('/my-rooms', verifyToken, getMyRooms);
router.put('/:id', verifyToken, upload.array('images', 5), updateRoom);
router.delete('/:id', verifyToken, deleteRoom);


export default router;