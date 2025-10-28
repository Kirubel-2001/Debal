import { errorHandler } from "../utils/error.js";
import Room from "../models/room.model.js";

export const createRoom = async (req, res, next) => {
  try {
        const {
      title,
      description,
      location,
      accommodationType,
      propertyType,
      gender,
      rent,
      phone,
      owner
    } = req.body;

    const room = await Room.create({
      title,
      description,
      location,
      accommodationType,
      propertyType,
      gender,
      rent,
      phone,
      owner
    });
    res.status(201).json({
      success: true,
      message: "Room listing created successfully",
      data: room,
    });
  } catch (error) {
    next(error);
    errorHandler(500, "Server error during room creation");
  }
};
