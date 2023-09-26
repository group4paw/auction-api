const Seller = require("../models/sellerModel");
const bcrypt = require("bcrypt");

exports.createSeller = async (req, res) => {
  const {
    sellerName,
    sellerEmail,
    sellerPassword,
    sellerPhoneNumber,
    sellerBalance,
    sellerAddress,
  } = req.body;
  try {
    const seller = await Seller.create({
      sellerName,
      sellerEmail,
      sellerPassword,
      sellerPhoneNumber,
      sellerBalance,
      sellerAddress,
    });
    return res.status(201).json({
      success: true,
      data: seller,
      message: "Seller created succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.sellerSignIn = async (req, res) => {
  const { sellerEmail, sellerPassword } = req.body;
  try {
    const seller = await Seller.findOne({ sellerEmail });

    if (!seller) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(
      sellerPassword,
      seller.sellerPassword
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Sign-in successful", seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.sellerSignUp = async (res, req) => {
  const { sellerName, sellerEmail, sellerPassword, sellerPhoneNumber } =
    req.body;

  try {
    const existingSeller = await Seller.findOne({ sellerEmail });
    if (existingSeller) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(sellerPassword, 10);

    const newSeller = new Seller({
      sellerName,
      sellerEmail,
      sellerPassword: hashedPassword,
      sellerPhoneNumber,
    });

    await newSeller.save();

    res.status(201).json({ message: "Seller created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
