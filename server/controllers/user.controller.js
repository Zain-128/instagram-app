import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userLoginSchema, userSchema } from "../constants/valiation.schemas.js";

export const registerUser = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password, username } = req.body;
    const isUserExists = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (!!isUserExists == true) {
      return next({
        status: 409,
        message: "User Already Exists ! ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });

    user = new USERDTO(user);

    return res.status(201).json({
      message: "User Created Successfully !",
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password, username } = req.body;
    const isUserExists = await UserModel.findOne({
      username,
    });
    if (!!isUserExists == false) {
      return next({
        status: 409,
        message: "User Not Found ! ",
      });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      isUserExists.password
    );

    if (!verifyPassword == false) {
      return next({
        status: 401,
        message: "Invalid Credentials ! ",
      });
    }
    let token = jwt.sign(
      { payload: isUserExists._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    req.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    let user = new USERDTO(isUserExists);

    return res.status(200).json({
      message: "User Logged in SuccessfULLY !",
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};
