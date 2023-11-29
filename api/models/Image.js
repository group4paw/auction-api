const mongoose = require("mongoose");

const Image = new mongoose.Schema({
  image: String,
  idPainting: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Painting",
  },
});

module.exports = mongoose.model("Image", Image);
