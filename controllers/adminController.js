import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Email and password are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Admin already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      email,
      password: hashedPassword,
      role: "admin"
    });

    return res.status(201).json({
      error: false,
      success: true,
      message: "Admin registered successfully",
      data:{
        id: admin._id,
        email:admin.email,
        role:admin.role
      }
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Email and password required"
      });
    }

    const admin = await User.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Admin not found"
      });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({
        error: true,
        success: false,
        message: "Not authorized as admin"
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        error: true,
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      error: false,
      success: true,
      message: "Admin login successful",
      token,
      data:{
        id: admin._id,
        email:admin.email,
        role:admin.role
      }
    });

  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message
    });
  }
};