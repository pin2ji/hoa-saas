const express = require('express');
const router = express.Router();
const Landlord = require('../models/Landlord');
const Property = require('../models/Property');
const Tenant = require('../models/Tenant');
const Lease = require('../models/Lease');

// मिडलवेयर
function isLandlord(req, res, next) {
  if (req.session.user && req.session.user.role === 'landlord') return next();
  res.redirect('/auth/login');
}

router.use(isLandlord);

// डैशबोर्ड
router.get('/dashboard', async (req, res) => {
  const landlord = await Landlord.findById(req.session.user.id).populate('properties');
  res.render('landlord_dashboard', { landlord });
});

// प्रॉपर्टी जोड़ें
router.post('/add-property', async (req, res) => {
  const property = new Property({ ...req.body, landlord: req.session.user.id });
  await property.save();
  await Landlord.findByIdAndUpdate(req.session.user.id, { $push: { properties: property._id } });
  res.redirect('/landlord/dashboard');
});

// किरायेदार जोड़ें
router.post('/add-tenant', async (req, res) => {
  const { name, email, phone, propertyId, rentAmount, startDate } = req.body;
  const tenant = new Tenant({ name, email, phone, property: propertyId, password: 'tenant123' }); // डिफ़ॉल्ट पासवर्ड
  await tenant.save();
  const lease = new Lease({ tenant: tenant._id, startDate, rentAmount });
  await lease.save();
  tenant.lease = lease._id;
  await tenant.save();
  res.redirect('/landlord/dashboard');
});

module.exports = router;
