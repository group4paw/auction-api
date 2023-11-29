const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose
      .connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
