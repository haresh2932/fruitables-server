const mongoose = required("mongoose");

const paymantsSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Types.ObjectId,
      ref: "Orders",
    },
    type: {
      type: String,
      tirm: true,
      required: true,
    },
    stock: {
      type: Number,
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

const Paymants = mongoose.model("Paymants", paymantsSchema);
module.exports = Paymants;