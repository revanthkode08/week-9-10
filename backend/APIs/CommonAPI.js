import exp from "express";
import { authenticate } from "../services/authService.js";
import { UserTypeModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middlewares/verifyToken.js";
export const commonRouter = exp.Router();

//login
commonRouter.post("/login", async (req, res) => {
  //get user cred object
  let userCred = req.body;
  //call authenticate service
  let { token, user } = await authenticate(userCred);
  // Determine cookie settings depending on environment and request
  // If backend is served over HTTPS (production/behind proxy) we must use SameSite=None and Secure=true
  const forwardedProto = req.headers['x-forwarded-proto'];
  const isRequestOverHttps = req.secure || (forwardedProto && forwardedProto.includes('https')) || process.env.NODE_ENV === 'production';

  const cookieOptions = {
    httpOnly: true,
    secure: !!isRequestOverHttps,
    sameSite: isRequestOverHttps ? 'none' : 'lax',
  };

  // save token as httpOnly cookie
  res.cookie('token', token, cookieOptions);
  //send res (include token in body so non-cookie clients can use Authorization)
  res.status(200).json({ message: "login success", payload: user, token });
});

//logout for User, Author and Admin
commonRouter.get("/logout", (req, res) => {
  // Clear the cookie named 'token'
  const forwardedProto = req.headers['x-forwarded-proto'];
  const isRequestOverHttps = req.secure || (forwardedProto && forwardedProto.includes('https')) || process.env.NODE_ENV === 'production';

  const cookieOptions = {
    httpOnly: true,
    secure: !!isRequestOverHttps,
    sameSite: isRequestOverHttps ? 'none' : 'lax',
  };

  res.clearCookie('token', cookieOptions);

  res.status(200).json({ message: "Logged out successfully" });
});

//Change password(Protected route)
commonRouter.put("/change-password", async (req, res) => {
  //get current password and new password
  const { role, email, currentPassword, newPassword } = req.body;
  // Prevent same password
  if (currentPassword === newPassword) {
    return res.status(400).json({ message: "newPassword must be different from currentPassword" });
  }

  // Find user by email (works for USER, AUTHOR, ADMIN — all same collection)
  const account = await UserTypeModel.findOne({ email });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, account.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }
  // Hash and save new password
  account.password = await bcrypt.hash(newPassword, 10);
  await account.save();

  res.status(200).json({ message: "Password changed successfully" });
});

//Page refresh
commonRouter.get("/check-auth", verifyToken("USER","AUTHOR","ADMIN"), (req, res) => {
  res.status(200).json({
    message: "authenticated",
    payload: req.user
  });
});

//Read all active articles (publicly accessible for home page)
commonRouter.get("/articles", async (req, res) => {
  try {
    const articles = await ArticleModel.find({ isArticleActive: true }).populate("author", "firstName lastName email profileImageUrl");
    res.status(200).json({ message: "all articles", payload: articles });
  } catch (err) {
    res.status(500).json({ message: "error fetching articles", error: err.message });
  }
});

//Read a single article by ID
commonRouter.get("/article/:id", async (req, res) => {
  try {
    const article = await ArticleModel.findOne({ _id: req.params.id, isArticleActive: true }).populate("author", "firstName lastName email profileImageUrl");
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "article found", payload: article });
  } catch (err) {
    res.status(500).json({ message: "error fetching article", error: err.message });
  }
});