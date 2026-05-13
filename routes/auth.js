const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Landlord = require('../models/Landlord');
const Tenant = require('../models/Tenant');

// लॉगिन पेज
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// लॉगिन पोस्ट
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user;
    if (role === 'landlord') {
      user = await Landlord.findOne({ email });
    } else {
      user = await Tenant.findOne({ email });
    }
    if (!user) return res.render('login', { error: 'ईमेल या पासवर्ड गलत है' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render('login', { error: 'ईमेल या पासवर्ड गलत है' });
    req.session.user = { id: user._id, role };
    if (role === 'landlord') res.redirect('/landlord/dashboard');
    else res.redirect('/tenant/dashboard');
  } catch (err) {
    res.render('login', { error: 'कुछ गड़बड़ हुई' });
  }
});

// लॉगआउट
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
