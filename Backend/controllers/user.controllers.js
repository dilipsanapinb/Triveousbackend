const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// get all users

exports.getAllUsers = async(req,res) => {
    try {
        const users = await User.find();
        res.status(200).json({message:"All users",users})
    } catch (error) {
        console.log(error.message);
        res
          .status(500)
          .json({ message: "Something went wrong at getting the all users" });
    }
}

// register user
exports.registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;
        const getUser = await User.findOne({ email });
        if (getUser) {
            return res.status(429).json({message:"User with this email exist allready"})
        }

        // validate the password
        if (!strongPasswordRegex.test(password)) {
            return res.status(400).json({ message: "Password must contail at least one capital letter,one symbol, and one number, and be at leasr * character long" });
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                res.status(429).json({ message: "Something went wrong at hashing the password" })
            } else {
                const user = new User({
                    firstname,
                    lastname,
                    email,
                    password:hash,
                    role,
                });
                await user.save();
                res.status(201).json({ message: "user registration is successfully" ,user})
            }
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong at register the user" })
    }
};

