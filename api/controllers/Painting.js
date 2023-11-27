const Painting = require("../models/Painting");

exports.createPainting = async (req, res) => {
  const {
    title,
    description,
    medium,
    width,
    height,
    frame,
    cityFrom,
    weight,
    sellerId,
  } = req.body;
  const image = req.file.filename;
  try {
    const painting = await Painting.create({
      title,
      description,
      medium,
      width,
      height,
      frame,
      cityFrom,
      weight,
      sellerId,
      image,
    });

    painting.sellerId = undefined;
    return res.status(201).json({
      success: true,
      data: painting,
      message: "Painting data created succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to add painting data",
    });
  }
};

exports.getPaintingById = async (req, res) => {
  const paintingId = req.params.id;
  try {
    const painting = await Painting.findById(paintingId)
      .populate("sellerId")
      .exec();
    if (!painting) {
      return res.status(404).json({ message: "painting not found" });
    }
    res.status(200).json({
      painting,
      message: "painting data retrieved succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePaintingDescById = async (req, res) => {
  const paintingId = req.params.id;
  const { newDesc } = req.body;
  try {
    const painting = await Painting.findById(paintingId);
    if (!painting) {
      return res.status(404).json({ message: "painting not found" });
    }
    painting.paintingDesc = newDesc;
    await painting.save();
    res.status(200).json({
      message: "Painting description updated successfully",
      newDesc: painting.paintingDesc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPaintingsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const paintings = await Painting.find({ sellerId: userId });
    if (!paintings) {
      return res
        .status(404)
        .json({ message: "Paintings not found", paintings });
    }
    res.status(200).json({
      paintings,
      message: "Paintings data retrieved succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
