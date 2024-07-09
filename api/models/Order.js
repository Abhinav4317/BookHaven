const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    email: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);
const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
