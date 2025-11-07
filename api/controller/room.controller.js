import { errorHandler } from "../utils/error.js";
import Room from "../models/room.model.js";
import { cloudinary, uploadToCloudinary } from "../utils/cloudinary.js";

// Create room
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
      owner,
    } = req.body;

    // Upload images to Cloudinary
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      // Upload all images to Cloudinary
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer)
      );
      const uploadResults = await Promise.all(uploadPromises);
      imageUrls = uploadResults.map((result) => result.secure_url);
    }

    const room = await Room.create({
      title,
      description,
      location,
      accommodationType,
      propertyType,
      gender,
      rent,
      phone,
      owner,
      images: imageUrls,
    });

    res.status(201).json({
      success: true,
      message: "Room listing created successfully",
      data: room,
    });
  } catch (error) {
    // Delete uploaded images from Cloudinary if room creation fails
    if (req.files && req.files.length > 0) {
      try {
        const uploadResults = await Promise.all(
          req.files.map((file) => uploadToCloudinary(file.buffer))
        );

        for (const result of uploadResults) {
          await cloudinary.uploader
            .destroy(result.public_id)
            .catch((err) => console.error(err));
        }
      } catch (cleanupError) {
        console.error("Error cleaning up images:", cleanupError);
      }
    }
    next(error);
  }
};

// Get all rooms with filters, sorting, and pagination
export const getAllRooms = async (req, res, next) => {
  try {
    const {
      location,
      minRent,
      maxRent,
      status,
      search,
      sort = "-createdAt",
      page = 1,
      limit = 10,
    } = req.query;

    // Build filter object
    const filter = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (status) {
      filter.status = status;
    }

    // Rent range filter
    if (minRent || maxRent) {
      filter.rent = {};
      if (minRent) filter.rent.$gte = Number(minRent);
      if (maxRent) filter.rent.$lte = Number(maxRent);
    }

    // Search in title and location
    if (search) {
  const words = search.split(" ").filter(Boolean); // split and remove empty strings

  filter.$or = words.map(word => ({
    $or: [
      { title: { $regex: word, $options: "i" } },
      { location: { $regex: word, $options: "i" } },
    ],
  }));
}


    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with filters, sorting, and pagination
    const rooms = await Room.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate("owner", "username email")
      .lean();

    // Get total count for pagination
    const totalRooms = await Room.countDocuments(filter);
    const totalPages = Math.ceil(totalRooms / limitNum);

    res.status(200).json({
      success: true,
      data: rooms,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalRooms,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};
// Update room
export const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return next(errorHandler(404, "Room not found"));
    }

    // Check if user owns this room
    if (room.owner.toString() !== req.user.id) {
      return next(errorHandler(403, "You can only update your own rooms"));
    }

    const {
      title,
      description,
      location,
      accommodationType,
      propertyType,
      gender,
      rent,
      phone,
      status,
    } = req.body;

    let imageUrls = room.images; // Keep existing images by default

    // If new images are uploaded
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      if (room.images && room.images.length > 0) {
        for (const imageUrl of room.images) {
          try {
            const urlParts = imageUrl.split("/");
            const publicIdWithExtension = urlParts[urlParts.length - 1];
            const publicId = `room-listings/${
              publicIdWithExtension.split(".")[0]
            }`;
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.error("Error deleting old image:", err);
          }
        }
      }

      // Upload new images
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer)
      );
      const uploadResults = await Promise.all(uploadPromises);
      imageUrls = uploadResults.map((result) => result.secure_url);
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        location,
        accommodationType,
        propertyType,
        gender,
        rent,
        phone,
        status,
        images: imageUrls,
      },
      { new: true, runValidators: true }
    ).populate("owner", "username email");

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: updatedRoom,
    });
  } catch (error) {
    next(error);
  }
};

// Delete room with images
export const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return next(errorHandler(404, "Room not found"));
    }

    // Check if user owns this room
    if (room.owner.toString() !== req.user.id) {
      return next(errorHandler(403, "You can only delete your own rooms"));
    }

    // Delete images from Cloudinary
    if (room.images && room.images.length > 0) {
      for (const imageUrl of room.images) {
        try {
          const urlParts = imageUrl.split("/");
          const publicIdWithExtension = urlParts[urlParts.length - 1];
          const publicId = `room-listings/${
            publicIdWithExtension.split(".")[0]
          }`;
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error("Error deleting image:", err);
        }
      }
    }

    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get rooms by owner (user's own rooms)
export const getMyRooms = async (req, res, next) => {
  try {
    const { status, sort = "-createdAt", page = 1, limit = 10 } = req.query;

    const filter = { owner: req.user.id };

    if (status) {
      filter.status = status;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const rooms = await Room.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .populate("owner", "username email")
      .lean();

    const totalRooms = await Room.countDocuments(filter);
    const totalPages = Math.ceil(totalRooms / limitNum);

    res.status(200).json({
      success: true,
      data: rooms,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalRooms,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};
