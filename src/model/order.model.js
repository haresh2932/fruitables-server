const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  pid: {
    type: mongoose.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  quntity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const ordersSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    shipping_id: {
      type: mongoose.Types.ObjectId,
      ref: "Shipping",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    items: [itemSchema],
    description: {
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

const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;