// mongoose schema
const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Seller",
    },
    idPainting: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Painting",
    },
    startingPrice: {
      type: Number,
      required: true,
    },
    reservePrice: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    bids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Auction", auctionSchema);
