const express = require('express');
const router  = express.Router();
const { FlightRequest } = require('../models');

// Aéroports statiques (pas besoin de BDD)
const AIRPORTS = [
  { code: 'TEB', name: 'Teterboro Airport',              city: 'New York',        state: 'NJ' },
  { code: 'VNY', name: 'Van Nuys Airport',               city: 'Los Angeles',     state: 'CA' },
  { code: 'OPF', name: 'Opa-locka Executive Airport',    city: 'Miami',           state: 'FL' },
  { code: 'APA', name: 'Centennial Airport',             city: 'Denver',          state: 'CO' },
  { code: 'DAL', name: 'Dallas Love Field',              city: 'Dallas',          state: 'TX' },
  { code: 'MDW', name: 'Chicago Midway',                 city: 'Chicago',         state: 'IL' },
  { code: 'BOS', name: 'Boston Logan',                   city: 'Boston',          state: 'MA' },
  { code: 'SFO', name: 'San Francisco International',    city: 'San Francisco',   state: 'CA' },
  { code: 'LAS', name: 'Harry Reid International',       city: 'Las Vegas',       state: 'NV' },
  { code: 'MIA', name: 'Miami International',            city: 'Miami',           state: 'FL' },
  { code: 'ASE', name: 'Aspen/Pitkin County Airport',   city: 'Aspen',           state: 'CO' },
  { code: 'HPN', name: 'Westchester County Airport',    city: 'White Plains',    state: 'NY' },
  { code: 'FXE', name: 'Fort Lauderdale Executive',     city: 'Fort Lauderdale', state: 'FL' },
  { code: 'BUR', name: 'Hollywood Burbank Airport',     city: 'Burbank',         state: 'CA' }
];

// GET tous les vols (admin)
router.get('/', async (req, res) => {
  try {
    const requests = await FlightRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, count: requests.length, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST nouvelle demande de vol → sauvegardé dans Atlas
router.post('/request', async (req, res) => {
  const { from, to, departure, returnDate, passengers, tripType, clientName, clientEmail, clientPhone, notes } = req.body;

  if (!from || !to || !departure) {
    return res.status(400).json({
      success: false,
      error: 'From, To et Departure sont obligatoires'
    });
  }

  try {
    const newRequest = await FlightRequest.create({
      from:           from.trim(),
      to:             to.trim(),
      departure,
      returnDate:     returnDate || null,
      passengers:     passengers || 1,
      tripType:       tripType || 'one-way',
      estimatedPrice: Math.floor(Math.random() * 50000) + 10000,
      clientName,
      clientEmail,
      clientPhone,
      notes
    });

    console.log(`✈️  New flight request saved: ${from} → ${to} [ID: ${newRequest._id}]`);

    res.status(201).json({
      success: true,
      message: 'Demande de vol enregistrée avec succès',
      data: newRequest
    });
  } catch (err) {
    console.error('Flight request error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET demande par ID
router.get('/:id', async (req, res) => {
  try {
    const request = await FlightRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, error: 'Demande introuvable' });
    }
    res.json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH mettre à jour le statut
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Statut invalide' });
  }
  try {
    const updated = await FlightRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET recherche aéroports
router.get('/airports/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ success: true, data: AIRPORTS });

  const query = q.toLowerCase();
  const filtered = AIRPORTS.filter(a =>
    a.name.toLowerCase().includes(query) ||
    a.city.toLowerCase().includes(query) ||
    a.code.toLowerCase().includes(query)
  );
  res.json({ success: true, data: filtered });
});

module.exports = router;
