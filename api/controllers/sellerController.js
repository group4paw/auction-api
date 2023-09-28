const Seller= require("../models/sellerModel");
const bcrypt = require('bcrypt');

exports.sellerSignUp = async (req,res) => {
    const {
        sellerName,
        sellerEmail,
        sellerPassword,
        sellerPhoneNumber,
        sellerBalance,
        sellerAddress,
    } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(sellerPassword, 10);
        const seller = await Seller.create({
        sellerName,
        sellerEmail,
        sellerPassword: hashedPassword,
        sellerPhoneNumber,
        sellerBalance, 
        sellerAddress,
        });
        return res.status(201).json({
        success: true,
        data: seller,
        message: "Seller created succesfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        })
        
    }
};

exports.sellerSignIn = async (req,res) => {
    const{
        sellerEmail,
        sellerPassword,
    } = req.body;
    try {
        const seller = await Seller.findOne({ sellerEmail });
    
        if (!seller) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        const passwordMatch = await bcrypt.compare(sellerPassword, seller.sellerPassword);
    
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        res.status(200).json({ message: 'Sign-in successful', seller });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};

exports.getSellerById = async (req,res) => {
    const sellerId = req.params.id;
    try {
        const seller = await Seller.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        res.status(200).json({ 
            sellerName: seller.sellerName,
            sellerBalance: seller.sellerBalance,
            message: "Seller data retrieved succesfully",
         });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });        
    }
};

exports.updateSellerBalanceById = async (req,res) => {
    const sellerId = req.params.id;
    const { newBalance } = req.body;
    try {
        const seller = await Seller.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        seller.sellerBalance = newBalance;
        await seller.save();
        res.status(200).json({ message: 'Seller balance updated successfully', newBalance: seller.sellerBalance });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });     
    }
};