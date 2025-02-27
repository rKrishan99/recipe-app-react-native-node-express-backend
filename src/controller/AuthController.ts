import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    console.log("Get data:", email, password);

    //check user is already exist
    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(400).json({
        message: "This email is already registered!",
      });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    //save user
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log("Login route hit");

    const { email, password } = req.body;
    console.log("Login data:", email, password);

    const currentUser = await User.findOne({ email });
    console.log("Current user:", currentUser);

    if (!currentUser) {
      console.log("Invalid Credentials!");
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      currentUser.password
    );
    console.log("Password match:", isPasswordMatch);

    if (!isPasswordMatch) {
      console.log("Invalid Password!");
      return res.status(400).json({
        success: false,
        message: "Invalid Password!",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: currentUser._id,
      },
      "JWT_SECRET",
      { expiresIn: "1h" }
    );

    console.log("Token generated:", token);

    return res.status(201).json({
      success: true,
      token,
      userId: currentUser._id,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
}


export { registerUser, loginUser };
