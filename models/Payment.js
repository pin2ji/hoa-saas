const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  amount: Number,
  date: { type: Date, default: Date.now },
  method: String,
  status: { type: String, default: 'pending' },
  razorpayPaymentId: String
});
module.exports = mongoose.model('Payment', paymentSchema);
