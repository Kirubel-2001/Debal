import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  // Check for token in Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return next(errorHandler(401, "Unauthorized - No token provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return next(errorHandler(401, "Token expired"));
      }
      return next(errorHandler(403, "Forbidden - Invalid token"));
    }

    req.user = user;
    next();
  });
};