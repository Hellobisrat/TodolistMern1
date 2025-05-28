import jwt from 'jsonwebtoken';


const authMiddleware = (req, res, next) => {
 
    const authHeader = req.headers.authorization;
    console.log("Received Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);
     try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};


export default authMiddleware;