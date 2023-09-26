const Insurance= require("../models/insuranceModel");

exports.createInsurance = async (req,res) => {
    const{
        idInsurance,
        insuranceName,
        insurancePrice,
    } = req.body;
    try {
        const insurance = await Insurance.create({
        idInsurance,
        insuranceName,
        insurancePrice,
        });
        return res.status(201).json({
        success: true,
        data: insurance,
        message: "Insurance created succesfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Server Error",
        })
    }
}; 

exports.getInsuranceById = async (req,res) => {
    const {insuranceId} = req.params;
    try {
        const insurance = await Insurance.findOne({ insuranceId });
    
        if (!insurance) {
          return res.status(404).json({ message: 'Delivery not found' });
        }
    
        res.status(200).json({ insurance });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};
