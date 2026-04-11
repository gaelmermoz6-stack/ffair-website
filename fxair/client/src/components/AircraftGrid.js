import React, { useState, useEffect } from 'react';
import './AircraftGrid.css';

const CATEGORIES = ['All', 'Light', 'Midsize', 'Super-midsize', 'Large', 'Ultra-Long-Range', 'Helicopter'];

const AircraftGrid = () => {
  const [aircraft, setAircraft] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/aircraft')
      .then(r => r.json())
      .then(data => {
        if (data.success) setAircraft(data.data);
      })
      .catch(() => {
        // Fallback mock data
        setAircraft([
          { id: '1', name: 'Phenom 300', category: 'Light', passengers: 8, range: 2010, image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600', fxselect: true },
          { id: '2', name: 'Challenger 300', category: 'Midsize', passengers: 9, range: 3100, image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600', fxselect: true },
          { id: '3', name: 'Global Express', category: 'Ultra-Long-Range', passengers: 13, range: 6700, image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=600', fxselect: true },
          { id: '4', name: 'Citation CJ3+', category: 'Light', passengers: 6, range: 1971, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600', fxselect: false },
          { id: '5', name: 'Gulfstream G450', category: 'Large', passengers: 14, range: 4350, image: 'https://images.unsplash.com/photo-1583396618422-6005fa3a4700?w=600', fxselect: false },
          { id: '6', name: 'AgustaWestland AW139', category: 'Helicopter', passengers: 8, range: 573, image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=600', fxselect: false }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All'
    ? aircraft
    : aircraft.filter(a => a.category === activeCategory);

  if (loading) return <div className="loading">Loading aircraft...</div>;

  return (
    <div className="aircraft-section">
      {/* Category tabs */}
      <div className="category-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="aircraft-grid">
        {filtered.map(plane => (
          <div className="aircraft-card" key={plane.id}>
            <div className="aircraft-image-wrap">
              <img
                src={plane.image}
                alt={plane.name}
                className="aircraft-image"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600'; }}
              />
              {plane.fxselect && (
                <span className="fxselect-badge">FXSELECT</span>
              )}
            </div>
            <div className="aircraft-info">
              <span className="aircraft-category">{plane.category}</span>
              <h3 className="aircraft-name">{plane.name}</h3>
              <div className="aircraft-specs">
                <div className="spec">
                  <span className="spec-value">{plane.passengers}</span>
                  <span className="spec-label">Passengers</span>
                </div>
                <div className="spec-divider"></div>
                <div className="spec">
                  <span className="spec-value">{plane.range.toLocaleString()}</span>
                  <span className="spec-label">Range (nm)</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="aircraft-cta">
        <a href="/en-us/fxselect" className="btn btn-outline-gold">Learn More</a>
      </div>
    </div>
  );
};

export default AircraftGrid;
