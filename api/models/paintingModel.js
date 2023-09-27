const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
  idPainting: { type: Number, unique: true, required: true, default: 0},
  paintingTitle: { type: String, required: true },
  paintingDesc: String,
  idSeller: { type: String, required: true },
  painting: Buffer, // BLOB (Binary Large Object) stored as a Buffer
});

// Define the getPaintingInformation method
paintingSchema.methods.getPaintingInformation = function () {
  const paintingInfo = {
    idPainting: this.idPainting,
    paintingTitle: this.paintingTitle,
    paintingDesc: this.paintingDesc,
    idSeller: this.idSeller,
  };
  return paintingInfo;
};

module.exports = mongoose.model('Painting', paintingSchema);
