const express = require('express');
const router  = express.Router();
const { MembershipInquiry } = require('../models');

// Données statiques des plans
const MEMBERSHIPS = [
  {
    id: '1',
    name: 'Aviator',
    tagline: 'Preferred Access',
    price: 50000,
    currency: 'USD',
    billingCycle: 'annual',
    features: [
      'Preferred access to FXSELECT aircraft',
      'Fixed predictable rates',
      'Priority booking',
      'Dedicated account manager',
      'Complimentary in-flight catering',
      '24/7 concierge service'
    ],
    aircraft: ['Phenom 300', 'Challenger 300'],
    color: '#C9A96E'
  },
  {
    id: '2',
    name: 'Aviator+',
    tagline: 'Guaranteed Access',
    price: 150000,
    currency: 'USD',
    billingCycle: 'annual',
    recommended: true,
    features: [
      'Guaranteed access to all FXSELECT aircraft',
      'Ultra-fixed predictable rates',
      'Same-day booking available',
      'Dedicated senior account manager',
      'Premium in-flight catering',
      '24/7 white-glove concierge',
      'Global Express access included',
      'Helicopter transfers included'
    ],
    aircraft: ['Phenom 300', 'Challenger 300', 'Global Express'],
    color: '#1A1A1A'
  }
];

// GET tous les plans (statique)
router.get('/', (req, res) => {
  res.json({ success: true, data: MEMBERSHIPS });
});

// GET plan par ID (statique)
router.get('/:id', (req, res) => {
  const plan = MEMBERSHIPS.find(m => m.id === req.params.id);
  if (!plan) return res.status(404).json({ success: false, error: 'Plan introuvable' });
  res.json({ success: true, data: plan });
});

// POST demande d'adhésion → sauvegardé dans Atlas
router.post('/inquire', async (req, res) => {
  const { name, email, phone, membershipId, message } = req.body;

  if (!name || !email || !membershipId) {
    return res.status(400).json({
      success: false,
      error: 'Nom, email et type de membership sont obligatoires'
    });
  }

  const plan = MEMBERSHIPS.find(m => m.id === membershipId);

  try {
    const inquiry = await MembershipInquiry.create({
      name:           name.trim(),
      email:          email.trim().toLowerCase(),
      phone:          phone?.trim(),
      membershipId,
      membershipName: plan?.name || 'Unknown',
      message:        message?.trim()
    });

    console.log(`🥇 New membership inquiry for ${plan?.name} from ${email} [ID: ${inquiry._id}]`);

    res.status(201).json({
      success: true,
      message: 'Demande reçue. Notre équipe vous contactera dans les 24 heures.',
      referenceId: `MBR-${inquiry._id}`
    });
  } catch (err) {
    console.error('Membership inquiry error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET toutes les demandes d'adhésion (admin)
router.get('/inquiries/all', async (req, res) => {
  try {
    const inquiries = await MembershipInquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
