const Delivery = require("../models/Delivery");

exports.createDelivery = async (req, res) => {
  const {
    idCustomer,
    idSeller,
    custAddress,
    custPhoneNumber,
    sellerAddress,
    idInsurance,
    ongkir,
  } = req.body;
  try {
    const delivery = await Delivery.create({
      idCustomer,
      idSeller,
      custAddress,
      custPhoneNumber,
      sellerAddress,
      idInsurance,
      ongkir,
    });
    return res.status(201).json({
      success: true,
      data: delivery,
      message: "Delivery detail created succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateOngkirById = async (req, res) => {
  const deliveryId = req.params.id;
  const { newOngkir } = req.body;
  try {
    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    delivery.ongkir = newOngkir;

    await delivery.save();

    res
      .status(201)
      .json({
        message: "Ongkir updated successfully",
        updatedDelivery: delivery.ongkir,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDeliveryById = async (req, res) => {
  const deliveryId = req.params.id;
  try {
    const delivery = await Delivery.findById(deliveryId);

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.status(200).json({ delivery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
