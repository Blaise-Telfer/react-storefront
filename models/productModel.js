const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    text: { type: String, required: true },
	user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  reviews: [reviewSchema]
});

module.exports = mongoose.model("product", productSchema);