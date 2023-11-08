import User from "../model/userSchema.js";
import Token from "../model/token.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPasword = await bcrypt.hash(req.body.password, salt);
    const user = {
      name: req.body.name,
      username: req.body.username,
      password: hashPasword,
    };
    const newUser = new User(user);
    await newUser.save();
    // return res.status(200).json({status:200,success:true,newUser,message:"Account Created!"})
    return res.status(200).json({ msg: "Account Created!" });
  } catch (error) {
    // return res.status(500).json({status:500,success:false,message:"Internal Server Error!"})
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const userLogin = async (req, res) => {
  let user = await User.findOne({
    username: req.body.username,
  });
  if (!user) {
    return res.status(400).json({ msg: "Username doesnot exist!" });
  }
  try {
    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_KEY);
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      return res.status(400).json({ msg: "Password doesnot Match!" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};
