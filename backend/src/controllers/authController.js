import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt, { compare } from "bcryptjs";
import admin from "../lib/firebase.js";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      //generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        message: "User created successfully",
      });
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    generateToken(user._id, res);
    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const loginWithGoogle = async (req, res) => {
  const { idToken } = req.body;

  try {
    if (!idToken) {
      return res.status(400).json({ message: "Google ID Token is required" });
    }

    // Verify Google token
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { email, name, uid } = decoded;

    let user = await User.findOne({ email });

    if (user) {
      // If user exists but doesn't have Google UID, update it
      if (!user.uid) {
        user.uid = uid;
        await user.save();
      }
    } else {
      // Create new user from Google account
      user = await User.create({
        uid,
        email,
        fullName: name,
        provider: "google", // password not needed
      });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.error("Error during loginWithGoogle:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0, // Set cookie to expire immediately
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error checkAuth authentication:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
