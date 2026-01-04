import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword
  });

  // 🔥 AUTO LOGIN (SESSION CREATION)
  req.login(newUser, (err) => {
    if (err) return next(err);

    // ✅ SEND RESPONSE ONLY AFTER SESSION EXISTS
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  });
});
