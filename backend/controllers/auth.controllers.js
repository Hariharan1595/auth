import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../utils/generateToken.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../utils/email.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    //get the user data from the request body

    //check for all fields are present
    if (!email || !password || !name) {
      return res.status(400).json({ error: "All fields are required" });
    }
    //check if the user already exists

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    //hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12); //12 is the salt rounds
    //creating a verification code

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationTokenExpires = Date.now() + 3600000; //1 hour

    //create a new user

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpires,
    });
    //save the user to the database

    await user.save();

    //creating a token and cookie using jsonwebtoken
    generateToken(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);

    //send the response
    res.status(201).json({
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid or expired verification code" });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    res
      .status(200)
      .json({ message: "Email verified successfully", user: { ...user._doc } });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email " });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid  password" });
    }
    generateToken(res, user._id);
    res
      .status(200)
      .json({
        message: "Signin successful",
        user: { ...user._doc, password: undefined },
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};

export const signout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signout successful" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpires = Date.now() + 3600000; //1 hour

    user.verificationToken = resetToken;
    user.verificationTokenExpires = resetTokenExpires;
    await user.save();
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user.email, resetURL);
    res.status(200).json({ message: "Reset password link sent to your email" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset code" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();
    await sendResetSuccessEmail(user.email);
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};
