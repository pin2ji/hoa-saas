const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const Payment = require('../models/Payment');
const Notice = require('../models/Notice');

function isTenant(req, res, next) {
  if (req.session.user && req.session.user.role === 'tenant') return next();
  res.redirect('/auth/login');
}

router.use(isTenant);

router.get('/dashboard', async (req, res) => {
  const tenant = await Tenant.findById(req.session.user.id).populate('lease property');
  const payments = await Payment.find({ tenant: tenant._id }).sort({ date: -1 });
  const notices = await Notice.find({ tenant: tenant._id }).sort({ sentAt: -1 });
  res.render('tenant_dashboard', { tenant, payments, notices });
});

// किराया भुगतान पेज (पेमेंट लिंक दिखाने के लिए)
router.get('/pay-rent', async (req, res) => {
  const tenant = await Tenant.findById(req.session.user.id).populate('lease');
  // यहाँ हम मान लेंगे कि मकान मालिक ने Razorpay पेमेंट लिंक बनाकर कहीं स्टोर किया है
  // अभी हम एक डमी लिंक दिखाएंगे, बाद में आप इसे डायनामिक बनाएंगे
  const razorpayLink = process.env.RAZORPAY_PAYMENT_LINK || 'https://rzp.io/l/demo';
  res.render('pay_rent', { tenant, razorpayLink });
});

module.exports = router;
