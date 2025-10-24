import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

