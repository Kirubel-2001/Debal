// routes/roomRoutes.js
import express from 'express';

import { verifyToken } from '../utils/verfyUser.js';
import { createRoom } from '../controller/room.controller.js';


const router = express.Router();

router.post("/create", createRoom);


export default router;