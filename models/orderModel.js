const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
};

const orderItemSchema = new Schema({
  name: { type: String, required: true },
  countInStock: { type: Number, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
});

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [orderItemSchema],
  shipping: [shippingSchema],
  itemsPrice: { type: Number },
  shippingPrice: { type: Number },
  totalPrice: { type: Number },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
}, {
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);