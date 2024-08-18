import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userSchema } from "../constants/valiation.schemas.js";

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
    if (!!isUserExists) {
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

    return res.status(200).json({
      message: "User Created Successfully !",
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};
