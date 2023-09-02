const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
require("dotenv").config();

// get all users

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "All users", users });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong at getting the all users" });
  }
};

// register user
exports.registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    const getUser = await User.findOne({ email });
    if (getUser) {
      return res
        .status(429)
        .json({ message: "User with this email exist allready" });
    }

    // validate the password
    if (!strongPasswordRegex.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "Password must contail at least one capital letter,one symbol, and one number, and be at least 8 character long",
        });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res
          .status(429)
          .json({ message: "Something went wrong at hashing the password" });
      } else {
        const user = new User({
          firstname,
          lastname,
          email,
          password: hash,
          role,
        });
        await user.save();
        res
          .status(201)
          .json({ message: "user registration is successfully", user });
      }
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong at register the user" });
  }
};

// login the users

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUserExists = await User.findOne({ email });
        if (!isUserExists) {
            return res
                .status(429)
                .json({ message: "User with this email not exist" });
        }
      const hashPassword = isUserExists.password;
      // console.log(isUserExists.role);
        bcrypt.compare(password, hashPassword, async (bcryptError, result) => {
            if (result) {
                const accessToken = jwt.sign(
                    { userId: isUserExists._id ,role:isUserExists.role},
                    process.env.secret,
                    { expiresIn: '1d' }
                );

                const refreshToken = jwt.sign(
                  { userId: isUserExists._id, role: isUserExists.role },
                  process.env.refreshSecret,
                  { expiresIn: "7d" }
                );

                res.status(200).json({ message: "Login Successfull", accessToken, refreshToken })
            } else {
                console.log("Password doesn't match:", bcryptError);
                res.status(401).json({ message: "Password doesn't match" });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong at login the user" });
    }
};

// refresh token

exports.refreshToken = async (req,res) => {
    try {
        const refreshToken = req.body.refreshToken;

        jwt.verify(refreshToken, process.env.refreshSecret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid refresh token" });
            } else {
                const accessToken = jwt.sign({ userId: decoded.userId }, process.env.secret, { expiresIn: '1h' });
                res.status(200).json({ accessToken });
            }
        })
    } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .json({ message: "Something went wrong at generating the refresh token" });
    }
};
