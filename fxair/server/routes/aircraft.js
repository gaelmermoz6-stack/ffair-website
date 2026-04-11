const express = require('express');
const router = express.Router();

const aircraft = [
  {
    id: '1',
    name: 'Phenom 300',
    category: 'Light',
    passengers: 8,
    range: 2010,
    speed: 453,
    description: 'The world\'s most-delivered light jet for 11 consecutive years. Perfect for shorter routes with maximum comfort.',
    features: ['Wi-Fi equipped', 'Flat-floor cabin', 'Baggage access in flight', 'Galley service'],
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800',
    hourlyRate: 4500,
    fxselect: true
  },
  {
    id: '2',
    name: 'Challenger 300',
    category: 'Midsize',
    passengers: 9,
    range: 3100,
    speed: 470,
    description: 'Super-midsize jet delivering exceptional comfort and range for coast-to-coast travel.',
    features: ['Stand-up cabin', 'Full galley', 'Private lavatory', 'Entertainment system'],
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800',
    hourlyRate: 7500,
    fxselect: true
  },
  {
    id: '3',
    name: 'Global Express',
    category: 'Ultra-Long-Range',
    passengers: 13,
    range: 6700,
    speed: 513,
    description: 'The pinnacle of ultra-long-range business aviation, connecting virtually any two cities non-stop.',
    features: ['Multiple cabin zones', 'Private stateroom', 'Full-size galley', 'Shower onboard'],
    image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800',
    hourlyRate: 14000,
    fxselect: true
  },
  {
    id: '4',
    name: 'Citation CJ3+',
    category: 'Light',
    passengers: 6,
    range: 1971,
    speed: 416,
    description: 'Efficient light jet ideal for regional travel with exceptional operating economics.',
    features: ['Wi-Fi available', 'Refreshment center', 'Individual lighting', 'Quiet cabin'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    hourlyRate: 3800,
    fxselect: false
  },
  {
    id: '5',
    name: 'Gulfstream G450',
    category: 'Large',
    passengers: 14,
    range: 4350,
    speed: 476,
    description: 'Large cabin, long-range aircraft offering intercontinental capability with supreme comfort.',
    features: ['Four-zone cabin', 'Full crew rest area', 'Satcom connectivity', 'Executive dining'],
    image: 'https://images.unsplash.com/photo-1583396618422-6005fa3a4700?w=800',
    hourlyRate: 11000,
    fxselect: false
  },
  {
    id: '6',
    name: 'AgustaWestland AW139',
    category: 'Helicopter',
    passengers: 8,
    range: 573,
    speed: 165,
    description: 'Premium helicopter for urban transfers, offshore access, and short-range luxury travel.',
    features: ['Air conditioned', 'Leather seating', 'Noise reduction system', 'VIP configuration'],
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800',
    hourlyRate: 2800,
    fxselect: false
  }
];

router.get('/', (req, res) => {
  const { category, fxselect } = req.query;
  let filtered = [...aircraft];

  if (category && category !== 'all') {
    filtered = filtered.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }

  if (fxselect === 'true') {
    filtered = filtered.filter(a => a.fxselect);
  }

  res.json({ success: true, data: filtered });
});

router.get('/:id', (req, res) => {
  const plane = aircraft.find(a => a.id === req.params.id);
  if (!plane) {
    return res.status(404).json({ success: false, error: 'Aircraft not found' });
  }
  res.json({ success: true, data: plane });
});

module.exports = router;
