const express  = require('express');
const cors     = require('cors');
const dotenv   = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString().slice(11,19)} ${req.method} ${req.path}`);
    next();
  });
}

// ── Routes ────────────────────────────────
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/flights',      require('./routes/flights'));
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/memberships',  require('./routes/memberships'));
app.use('/api/contact',      require('./routes/contact'));
app.use('/api/aircraft',     require('./routes/aircraft'));

// ── Health check ──────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'FXAIR API running', timestamp: new Date().toISOString() });
});

// ── 404 ───────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Error handler ─────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start ─────────────────────────────────
// Remplace ton bloc "Start" actuel par celui-ci :
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(PORT, () => {
//     console.log(`\n  🛩  FXAIR Server running on port ${PORT}\n`);
//   });
// }

module.exports = app;
