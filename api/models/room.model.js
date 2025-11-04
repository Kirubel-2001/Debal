import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxLength: [1000, "Description cannot exceed 1000 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    accommodationType: {
      type: String,
      enum: ["room", "property"],
      default: "room",
    },
    propertyType: {
      type: String,
      enum: ["apartment", "house", "condominium"],
      default: "apartment",
    },
    gender: {
      type: String,
      enum: ["male", "female", "any"],
      default: "male",
    },
    rent: {
      type: Number,
      required: [true, "Rent is required"],
      min: [200, "Rent must be at least 200 ETB"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (v) {
          if (!v) return true; // Phone is optional
          return /^(?:\+251|0)?[79]\d{8}$/.test(v);
        },
        message: "Please enter a valid Ethiopian phone number",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    status: {
      type: String,
      enum: ["available", "rented"],
      default: "available",
    },
    images: [
      {
        type: String, // Cloudinary URLs
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
roomSchema.index({ location: 1, status: 1 });
roomSchema.index({ rent: 1 });
roomSchema.index({ createdAt: -1 });

const Room = mongoose.model("Room", roomSchema);

export default Room;
