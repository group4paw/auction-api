const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
	bidder: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	auction: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	amount: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model("Bid", bidSchema);