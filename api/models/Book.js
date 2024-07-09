const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookTitle: { type: String, required: true },
  authorName: { type: String, required: true },
  imagePath: { type: String, required: true },
  category: { type: String, required: true },
  bookDescription: String,
  bookPDFURL: String,
  price: Number,
});

const BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;
