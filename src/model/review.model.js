const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Ratings = mongoose.model("Ratings", ratingsSchema);
module.exports = Ratings;