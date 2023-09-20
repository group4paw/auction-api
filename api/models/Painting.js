const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
  title: String,
  // Add other painting-related fields as needed
});

module.exports = mongoose.model('Painting', paintingSchema);
