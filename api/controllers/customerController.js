const Customer= require("../models/customerModel");
const bcrypt = require('bcrypt');

exports.createCustomer = async (req,res) => {
    const {
        idCustomer,
        custName,
        custEmail,
        custPassword,
        custPhoneNumber,
        custBalance,
    } = req.body;
    try {
        const customer = await Customer.create({
        idCustomer,
        custName,
        custEmail,
        custPassword,
        custPhoneNumber,
        custBalance,   
        });
        return res.status(201).json({
        success: true,
        data: customer,
        message: "Customer created succesfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        })
        
    }
};

exports.customerSignIn = async (req,res) => {
    const{
        custEmail,
        custPassword,
    } = req.body;
    try {
        const customer = await Customer.findOne({ custEmail });
    
        if (!customer) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        const passwordMatch = await bcrypt.compare(custPassword, customer.custPassword);
    
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        res.status(200).json({ message: 'Sign-in successful', customer });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};

exports.customerSignUp = async (res,req) => {
    const { 
        custName, 
        custEmail, 
        custPassword, 
        custPhoneNumber, 
    } = req.body;

    try {
        const existingCustomer = await Customer.findOne({ custEmail });
        if (existingCustomer) {
        return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(custPassword, 10);

        const newCustomer = new Customer({
        custName,
        custEmail,
        custPassword: hashedPassword,
        custPhoneNumber,
        });

        await newCustomer.save();

        res.status(201).json({ message: 'Customer created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
