const { validationResult } = require("express-validator");
const Auction = require("../models/Auction.js");
const Bid = require("../models/Bid.js");
const { default: mongoose } = require("mongoose");

exports.addAuctionController = async (req, res) => {
	const { userid, startingPrice, reservePrice, startDate, endDate, idPainting } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array().map((error) => error.msg)[0] });

	// parse dates
	const parsedStartDate = new Date(startDate);
	const parsedEndDate = new Date(endDate);

	// type checks
	if (
		typeof userid !== "string" ||
		typeof startingPrice !== "number" ||
		typeof reservePrice !== "number" ||
		isNaN(parsedStartDate) || // invalid dates are NaN
		isNaN(parsedEndDate) ||
		typeof idPainting !== "string"
	)
		return res.status(400).json({ message: "Invalid data provided." });

	// additional check
	if (startDate >= endDate) return res.status(400).json({ message: "Invalid date range." });

	try {
		const auction = await Auction({
			owner: new mongoose.Types.ObjectId(userid),
			startingPrice: startingPrice,
			reservePrice: reservePrice,
			startDate: parsedStartDate,
			endDate: parsedEndDate,
			idPainting: new mongoose.Types.ObjectId(idPainting),
			bids: [],
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
	// additional data helper function
	function appendAdditionalData(doc) {
		const auction = doc.toJSON();
		if (auction.startDate > new Date()) auction.status = "scheduled";
		if (auction.startDate <= new Date()) auction.status = "ongoing";
		if (auction.endDate <= new Date()) auction.status = "over";

		return auction;
	}

	// direct get
	const id = req.params.auctionID;
	if (id) {
		if (id.length != 24) return res.status(404).json({ message: "Auction not found" });
		Auction.findById(id)
			.exec()
			.then((doc) => {
				if (!doc) return res.status(404).json({ message: "Auction not found" });
				else {
					// additional data
					const auction = appendAdditionalData(doc);
					return res.status(200).json(auction);
				}
			});

		return;
	}

	// filter query
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

	// get auctions
	const auctionsDocument = await Auction.find(filter);

	// append additional data
	const auctions = auctionsDocument.map((auction) => appendAdditionalData(auction));

	return res.status(200).json(auctions);
};

exports.removeAuctionsController = async (req, res) => {
	const id = req.params.auctionID;
	const { userid } = req.body;

	// find auction and check if its ongoing
	if (id.length != 24) return res.status(404).json({ message: "Auction not found" });
	try {
		const auction = await Auction.findById(id);
		if (!auction) return res.status(404).json({ message: "Auction not found" });

		// reject if not owner
		// if auction has no owner then proceed
		if (auction.owner && !auction.owner.equals(new mongoose.Types.ObjectId(userid)))
			return res.status(403).json({ message: "Unauthorized" });

		// reject if ongoing
		// if auction has no owner then proceed
		if (auction.owner && auction.startDate <= new Date() && auction.endDate > new Date())
			return res.status(403).json({ message: "Auction already started" });
	} catch {
		return res.status(404).json({ message: "Auction not found" });
	}

	// delete the auction
	const deletedAuction = await Auction.findByIdAndRemove(id);

	return res.status(200).json({
		success: true,
		data: deletedAuction,
		message: "Auction deleted successfully",
	});
};

exports.addBidController = async (req, res) => {
	const id = req.params.auctionID;
	const { userid, amount } = req.body;

	// find auction and check if its ongoing
	if (id.length != 24) return res.status(404).json({ message: "Auction not found" });
	try {
		const auction = await Auction.findById(id)
			.exec()
			.then(async (doc) => {
				if (!doc) return res.status(404).json({ message: "Auction not found" });

				// reject if not ongoing
				if (doc.startDate > new Date()) return res.status(403).json({ message: "Auction hasn't started." });
				if (doc.endDate <= new Date()) return res.status(403).json({ message: "Auction has already ended." });

				// reject if id is owner
				if (doc.owner == new mongoose.Types.ObjectId(userid))
					return res.status(403).json({ message: "Invalid bidder." });

				const bid = await Bid({
					bidder: new mongoose.Types.ObjectId(userid),
					auction: doc._id,
					amount: amount,
				});

				const savedBid = await bid.save();

				const updatedAuction = await Auction.findByIdAndUpdate(id, { $push: { bids: savedBid._id } }, { new: true });

				return res.status(200).json({
					success: true,
					data: updatedAuction,
					message: "Bid successful",
				});
			});

		return;
	} catch (err) {
		console.log(err);
		return res.status(404).json({ message: "Auction not found" });
	}
};
