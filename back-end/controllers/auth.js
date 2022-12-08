import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  console.log(req.body.username);
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPassCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "secretkey"
    );

    const { password, isAdmin, ...responseUser } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...responseUser });
  } catch (error) {
    next(error);
  }
};
