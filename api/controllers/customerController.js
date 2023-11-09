const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");

exports.customerSignUp = async (req, res) => {
  const {
    custName,
    custEmail,
    custPassword,
    custPhoneNumber,
    custBalance,
    custAddress,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(custPassword, 10);
    const customer = await Customer.create({
      custName,
      custEmail,
      custPassword: hashedPassword,
      custPhoneNumber,
      custBalance,
      custAddress,
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
  const { custEmail, custPassword } = req.body;
  try {
    const customer = await Customer.findOne({ custEmail });

    if (!customer) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(
      custPassword,
      customer.custPassword
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Sign-in successful", customer });
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
      custName: customer.custName,
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
