import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if (!token) return res.status(401).json("unauthorized");
  try {
   
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json("Access denied");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
