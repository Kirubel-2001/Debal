import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  // Check if user is updating their own profile
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You can only update your own account"));
  }

  try {
    const { name, email, phone, password } = req.body;

    // Build update object
    const updateData = {};

    if (name) updateData.name = name;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({
        email,
        _id: { $ne: req.params.id },
      });
      if (existingUser) {
        return next(errorHandler(400, "Email already in use"));
      }
      updateData.email = email;
    }
    if (phone) updateData.phone = phone;
    if (password) {
      updateData.password = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    // Convert _id to id for frontend consistency
    const normalizedUser = {
      ...updatedUser._doc, // _doc contains the MongoDB document fields
      id: updatedUser._id, // add id field
    };
    delete normalizedUser._id; // optional: remove _id if you want

    res.status(200).json(normalizedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // Check if user is deleting their own profile
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You can only delete your own account"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
