const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.sellerSignUp = async (req, res) => {
  const { name, username, email, password, phoneNumber, address, image } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const seller = await Seller.create({
      name,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      image,
    });
    return res.status(201).json({
      success: true,
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
  const { email, password } = req.body;
  try {
    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, seller.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: seller.id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    seller.password = undefined;

    res
      .status(200)
      .json({ message: "Sign-in successful", seller, token, role: "seller" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSellerById = async (req, res) => {
  const sellerId = req.params.id;
  try {
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.status(200).json({
      sellerName: seller.sellerName,
      sellerBalance: seller.sellerBalance,
      message: "Seller data retrieved succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSellerBalanceById = async (req, res) => {
  const sellerId = req.params.id;
  const { newBalance } = req.body;
  try {
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    seller.sellerBalance = newBalance;
    await seller.save();
    res.status(200).json({
      message: "Seller balance updated successfully",
      newBalance: seller.sellerBalance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
