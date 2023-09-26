// mongoose schema
const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
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
	idPainting: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	bids: {
		type: [mongoose.Schema.Types.ObjectId],
		required: true,
	},
});

module.exports = mongoose.model("Auction", auctionSchema);
