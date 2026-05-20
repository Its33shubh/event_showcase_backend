import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ 
      error:true,
      success:false,
      message: "No token , Access denied" 
    });
  }

  const token = header.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ 
      error:true,
      success:false,
      message: "Invalid token" 
    });
  }
};
