import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authAdmin = async (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({
      error: true,
      success: false,
      message: "No token, Access denied"
    });
  }

  const token = header.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(verified.id);
    //    console.log(verified);
    if (!user) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "User not found"
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        error: true,
        success: false,
        message: "Admin access only"
      });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(400).json({
      error: true,
      success: false,
      message: "Invalid token"
    });
  }
};