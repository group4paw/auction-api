const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");
const Wishlist = require("../models/Wishlist");
const Bid = require("../models/Bid.js");

exports.customerSignUp = async (req, res) => {
  const { name, username, email, password, phoneNumber, address, image } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await Customer.create({
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
      data: customer,
      message: "Customer created succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.customerSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    customer.password = undefined;
    customer.updatedAt = undefined;

    res
      .status(200)
      .json({ message: "Sign-in successful", customer, role: "buyer" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCustomerById = async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({
      name: customer.name,
      custBalance: customer.custBalance,
      message: "Customer data retrieved succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCustomerBalanceById = async (req, res) => {
  const customerId = req.params.id;
  const { newBalance } = req.body;
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "customer not found" });
    }
    customer.custBalance = newBalance;
    await customer.save();
    res.status(200).json({
      message: "Customer balance updated successfully",
      newBalance: customer.custBalance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getInformationUser = async (req, res) => {
  const { id } = req.params;

  try {
    // get count wishlist from customer
    const countWishlist = await Wishlist.find({ idCustomer: id }).count();
    // get count bid from customer
    const countBid = await Bid.find({ bidder: id }).count();

    const countOrder = await Order.find({ idCustomer: id }).count();

    res.status(200).json({
      success: true,
      data: {
        countWishlist,
        countBid,
        countOrder,
      },
      message: "Information user retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
