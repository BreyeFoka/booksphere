const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genres: [String], // e.g., ["Fantasy", "Mystery"]
    coverImage: { type: String, default: "" }, // URL for book cover image
    publishedDate: { type: Date },
    ratings: { type: Number, default: 0 }, // Average rating
    ratingCount: { type: Number, default: 0 }, // Total number of ratings
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Array of review references
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
