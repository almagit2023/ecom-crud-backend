const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    const userModel = new UserModel({
      name,
      email,
      password,
    });

    userModel.password = await bcrypt.hash(password, salt);
    await userModel.save();

    res.status(201).json({
      message: "New User Registration successful",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Internal Server Error`,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(403).json({
        message: "This is User doesnt exits",
        success: false,
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      res.status(403).json({
        message: "Password not correct",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
        message:"Login Successful",
        success:true,
        jwtToken,
        email,
        name:user.name
    })
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({
        message : `Internal Server Error`,
        success: false
    })
  }
};

module.exports = {
  signup,
  login
};
