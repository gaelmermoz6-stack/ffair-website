const express = require('express');
const router = express.Router();

const destinations = [
  {
    id: '1',
    slug: 'los-angeles',
    name: 'Los Angeles, CA',
    description: 'The entertainment capital of the world, offering luxury experiences from Beverly Hills to Malibu.',
    airports: ['VNY', 'BUR', 'SMO'],
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800',
    featured: true,
    highlights: ['Hollywood Hills', 'Beverly Hills', 'Santa Monica', 'Malibu'],
    travelTime: '5h from NY'
  },
  {
    id: '2',
    slug: 'new-york-ny',
    name: 'New York, NY',
    description: 'The city that never sleeps, with world-class dining, culture, and business at every turn.',
    airports: ['TEB', 'HPN', 'FRG'],
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    featured: true,
    highlights: ['Manhattan', 'The Hamptons', 'Greenwich', 'White Plains'],
    travelTime: 'Hub'
  },
  {
    id: '3',
    slug: 'miami',
    name: 'Miami, FL',
    description: 'A vibrant destination blending luxury beach life, world-class art, and incredible cuisine.',
    airports: ['OPF', 'FXE', 'TMB'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    featured: true,
    highlights: ['South Beach', 'Brickell', 'Coconut Grove', 'Bal Harbour'],
    travelTime: '3h from NY'
  },
  {
    id: '4',
    slug: 'aspen',
    name: 'Aspen, CO',
    description: 'Premier ski destination with year-round mountain luxury and world-class dining.',
    airports: ['ASE'],
    image: 'https://images.unsplash.com/photo-1551524164-6cf2ac531eb6?w=800',
    featured: false,
    highlights: ['Aspen Mountain', 'Snowmass', 'Vail', 'Beaver Creek'],
    travelTime: '4h from NY'
  },
  {
    id: '5',
    slug: 'las-vegas',
    name: 'Las Vegas, NV',
    description: 'The entertainment capital of the desert, with luxury resorts and non-stop excitement.',
    airports: ['LAS', 'HND'],
    image: 'https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?w=800',
    featured: false,
    highlights: ['The Strip', 'Summerlin', 'Henderson'],
    travelTime: '5h from NY'
  }
];

// GET all destinations
router.get('/', (req, res) => {
  const featured = req.query.featured;
  if (featured === 'true') {
    return res.json({ success: true, data: destinations.filter(d => d.featured) });
  }
  res.json({ success: true, data: destinations });
});

// GET destination by slug
router.get('/:slug', (req, res) => {
  const dest = destinations.find(d => d.slug === req.params.slug);
  if (!dest) {
    return res.status(404).json({ success: false, error: 'Destination not found' });
  }
  res.json({ success: true, data: dest });
});

module.exports = router;
