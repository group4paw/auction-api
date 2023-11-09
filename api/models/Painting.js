const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema(
  {
  paintingTitle: {
     type: String,
      required: true,
      unique: true
    },
  paintingDesc: { 
    type: String
  }
});

// Define the getPaintingInformation method
paintingSchema.methods.getPaintingInformation = function () {
  const paintingInfo = {
    idPainting: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Painting",
    },
    paintingTitle: this.paintingTitle,
    paintingDesc: this.paintingDesc,
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Seller",
    }
  }
  return paintingInfo;
};

module.exports = mongoose.model('Painting', paintingSchema);
