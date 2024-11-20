import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import User from "../models/UserModel.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invaild credentials" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.AUTH, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token })

  } catch (error) {
    res.status(500).json({ message: "Something went wrong. " })

  }
}

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(404).json({ message: "Email already exist" });

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.AUTH, { expiresIn: "1h" });

    res.status(200).json({ result, token })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong. " })
  }


}

export const updateUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body; // refers to new data
  const { userId: _userId } = req.params

  try {
    const requestUser = await User.findById(_userId)

    // user sent a new email address
    if (requestUser.email !== email) {
      // check if mail already taken
      const existingUser = await User.find({ email });
      if (existingUser) return res.status(404).json({ message: "Email already exist" });
    }

    // to save update result
    var result

    if (password) {
      // if we provided a new password
      const hashPassword = await bcrypt.hash(password, 12);
      result = await User.findByIdAndUpdate(_userId, { email: email, password: hashPassword, name: `${firstName} ${lastName}` },{ new: true });
    }
    else // dont update password field
      result = await User.findByIdAndUpdate(_userId, { email: email, name: `${firstName} ${lastName}` },{ new: true });

    // create new token
    const token = jwt.sign({ email: result.email, id: result._id }, process.env.AUTH, { expiresIn: "1h" });

    res.status(200).json({ result, token })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong. " })
  }
}