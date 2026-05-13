const mongoose = require('mongoose');
const leaseSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  startDate: Date,
  endDate: Date,
  rentAmount: Number,
  securityDeposit: Number,
  active: { type: Boolean, default: true }
});
module.exports = mongoose.model('Lease', leaseSchema);
