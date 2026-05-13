const mongoose = require('mongoose');
const tenantSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  idProof: String, // आप चाहें तो फाइल अपलोड बाद में जोड़ें, फिलहाल टेक्स्ट URL रखें
  emergencyContact: String,
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  lease: { type: mongoose.Schema.Types.ObjectId, ref: 'Lease' },
  password: String
});
module.exports = mongoose.model('Tenant', tenantSchema);
