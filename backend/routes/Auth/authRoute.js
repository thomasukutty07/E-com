import express from "express";
import {
  authMiddleWare,
  LoginUser,
  LogoutUser,
  RegisterUser,
} from "../../controllers/Auth/authController.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", LogoutUser);
router.get("/check-auth", authMiddleWare, (req, res) => {
  const user = req.user;
  res.status(200).json({ success: true, message: "Authorized User", user });
});

export default router;
