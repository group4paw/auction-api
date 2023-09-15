const User = require("../models/User.js");
const { validationResult } = require("express-validator");

exports.registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ errors: errors.array().map((error) => error.msg)[0] });
  } else {
    try {
      const user = await User({
        name,
        email,
        password,
      });
      await user.save();
      return res.status(201).json({
        success: true,
        data: user,
        message: "User created successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
