const mongoose = require("mongoose");

const paintingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    medium: {
      type: String,
      required: true,
      trim: true,
    },
    width: {
      type: Number,
      required: true,
      trim: true,
    },
    height: {
      type: Number,
      required: true,
      trim: true,
    },
    frame: {
      type: String,
      required: true,
      trim: true,
    },
    cityFrom: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: Number,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    estimatedDelivery: {
      type: String,
      required: true,
      trim: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Seller",
    },
  },
  {
    timestamps: true,
  }
);

// Define the getPaintingInformation method
paintingSchema.methods.getPaintingInformation = function () {
  const paintingInfo = {
    idPainting: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Painting",
    },
    title: this.title,
    description: this.description,
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Seller",
    },
  };
  return paintingInfo;
};

module.exports = mongoose.model("Painting", paintingSchema);
