import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error:true,
        success:false,
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      error:false,
      success:true,
      message: "User registered successfully",
      data:{
        id: user._id,
        email:user.email,
        role:user.role
      }
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      error:true,
      success:false,
      message: error.message
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        error:true,
        success:false,
        message: "User not found" 
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        error:true,
        success:false,
        message: "Invalid password" 
      });
    }

    // JWT Token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      error:false,
      success:true,
      message: "Login successful",
      token,
      user:{
        id : user._id,
        email: user.email,
        role:user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};