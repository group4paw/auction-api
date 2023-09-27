const Painting = require('../models/paintingModel');

exports.createPainting = async (req, res) => {
  const {
     paintingTitle,
     paintingDesc
  } = req.body;
  try {
    const painting = await Painting.create({
        paintingTitle,
        paintingDesc
    });
    return res.status(201).json({
      success: true,
      data: painting,
      message: "Painting data created succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Failed to add painting data",
    });
  }
};