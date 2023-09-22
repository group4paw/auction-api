const Customer= require("../models/customerModel");

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