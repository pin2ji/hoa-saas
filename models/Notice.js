const mongoose = require('mongoose');
const noticeSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  message: String,
  sentAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Notice', noticeSchema);
