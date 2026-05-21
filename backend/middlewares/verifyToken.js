import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const verifyToken = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Read token from cookie OR Authorization header
      let token = null;
      if (req.cookies && req.cookies.token) token = req.cookies.token;
      else if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        return res.status(401).json({ message: "Unauthorized. Please login" });
      }

      // Verify and decode token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Check if role is allowed
      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({ message: "Forbidden. You don't have permission" });
      }

      // Attach user info to req for use in routes
      req.user = decodedToken;

      next();
    } catch (err) {
      // jwt.verify throws if token is invalid/expired
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Session expired. Please login again" });
      }
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token. Please login again" });
      }
      // For other errors, return unauthorized to the client
      console.error("verifyToken error:", err);
      return res.status(401).json({ message: "Unauthorized. Please login." });
    }
  };
};
