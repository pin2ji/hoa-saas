const mongoose = require('mongoose');
const propertySchema = new mongoose.Schema({
  name: String,
  address: String,
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord' }
});
module.exports = mongoose.model('Property', propertySchema);
