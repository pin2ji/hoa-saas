require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const app = express();

// डेटाबेस कनेक्शन
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// सेशन सेटअप
app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecretkey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

// EJS और पब्लिक फोल्डर
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// रूट्स
app.use('/auth', require('./routes/auth'));
app.use('/landlord', require('./routes/landlord'));
app.use('/tenant', require('./routes/tenant'));

app.get('/', (req, res) => {
  if (req.session.user) {
    if (req.session.user.role === 'landlord') return res.redirect('/landlord/dashboard');
    else return res.redirect('/tenant/dashboard');
  }
  res.redirect('/auth/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
