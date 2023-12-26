const mongoose = require("mongoose");
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cart-craze"
);

module.exports = mongoose.connection;
