import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
// Register User
const RegisterUser = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json({
        success: false,
        message: "Email already in use",
      });
    }
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.json({
        success: false,
        message: "Username already in use",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "Registration Successfull" });
  } catch (error) {
    if (error.code === 11000) {
      let message = "Duplicate field";
      if (error.keyPattern?.email) message = "Email already in use";
      if (error.keyPattern?.userName) message = "Username already in use";
      return res
        .status(400)
        .json({ success: false, message });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Login User
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect Password" });
    }
    const token = jwt.sign(
      {
        id: findUser._id,
        role: findUser.role,
        email: findUser.email,
        userName: findUser.userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, 
        sameSite: "strict",   
      })
      .json({
        success: true,
        message: "Login Successfully",
        user: {
          id: findUser._id,
          userName: findUser.userName,
          email: findUser.email,
          role: findUser.role,
        },
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logout User
const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "Logout Successfull" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//Auth middleware
const authMiddleWare = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.json({ success: false, message: "Unauthorized User" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized User" });
  }
};

export { RegisterUser, LoginUser, LogoutUser, authMiddleWare };
