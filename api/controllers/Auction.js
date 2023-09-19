const { validationResult } = require("express-validator");
const ObjectId = require('mongodb').ObjectId;
const Auction = require("../models/Auction.js");

exports.addAuctionController = async (req, res) => {
	// authorization if needed
	const { startingPrice, reservePrice, startDate, endDate, idPainting } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array().map((error) => error.msg)[0] });

	// parse dates
	const parsedStartDate = new Date(startDate);
	const parsedEndDate = new Date(endDate);

	// type checks
	if (
		typeof startingPrice !== "number" ||
		typeof reservePrice !== "number" ||
		isNaN(parsedStartDate) || // invalid dates are NaN
		isNaN(parsedEndDate) || // invalid dates are NaN
		typeof idPainting !== "number"
	)
		return res.status(400).json({ message: "Invalid data provided." });

	// additional check
	if (startDate >= endDate) return res.status(400).json({ message: "Invalid date range." });

	try {
		const auction = await Auction({
			startingPrice: startingPrice,
			reservePrice: reservePrice,
			startDate: parsedStartDate,
			endDate: parsedEndDate,
			idPainting: idPainting,
			bidders: [],
		});
		await auction.save();
		return res.status(201).json({
			success: true,
			data: auction,
			message: "Auction created successfully",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: "Server Error",
		});
	}
};

exports.getAuctionsController = async (req, res) => {
	// get filters
	const id = req.params.auctionID;
	if (id) {
		if (id.length != 24) res.status(404).json({ message: "Auction not found" });
		try {
			const auction = await Auction.findById(id);
			if (!auction) return res.status(404).json({ message: "Auction not found" });
			return res.status(200).json(auction);
		}
		catch { return res.status(404).json({ message: "Auction not found" }); }
	}
	const { status } = req.query;
	const filter = {};
	if (status) {
		switch (status) {
			case "scheduled":
				filter.startDate = { $gt: new Date() };
				break;
			case "ongoing":
				filter.startDate = { $lt: new Date() };
				filter.endDate = { $gt: new Date() };
				break;
			case "over":
				filter.endDate = { $lt: new Date() };
				break;
			default:
				break;
		}
	}

	const auctionsDocument = await Auction.find(filter);
	const auctions = auctionsDocument.map((auction) => auction.toJSON());

	// additional data
	// status
	auctions.forEach(auction => {
		if (auction.startDate > new Date()) auction.status = "scheduled";
		if (auction.startDate <= new Date()) auction.status = "ongoing";
		if (auction.endDate <= new Date()) auction.status = "over";
	});

	return res.status(200).json(auctions);
};

exports.removeAuctionsController = async (req, res) => {
	// authorization if needed
	const id = req.params.auctionId;
	const auction = await Auction.find({ _id: ObjectId(id)});
	if (auction.length == 0) res.status(404).json({ message: "Auction not found" });
	res.status(200).json([]);
}