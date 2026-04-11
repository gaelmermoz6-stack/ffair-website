import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FXSelect.css';

const FXSelect = () => {
  const [aircraft, setAircraft] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/aircraft?fxselect=true')
      .then(r => r.json())
      .then(data => { if (data.success) setAircraft(data.data); })
      .catch(() => setAircraft([
        { id: '1', name: 'Phenom 300', category: 'Light', passengers: 8, range: 2010, speed: 453, hourlyRate: 4500, description: "The world's most-delivered light jet. Perfect for shorter routes with maximum comfort.", features: ['Wi-Fi equipped', 'Flat-floor cabin', 'Baggage access in flight', 'Galley service'], image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800' },
        { id: '2', name: 'Challenger 300', category: 'Midsize', passengers: 9, range: 3100, speed: 470, hourlyRate: 7500, description: 'Super-midsize jet delivering exceptional comfort and range for coast-to-coast travel.', features: ['Stand-up cabin', 'Full galley', 'Private lavatory', 'Entertainment system'], image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800' },
        { id: '3', name: 'Global Express', category: 'Ultra-Long-Range', passengers: 13, range: 6700, speed: 513, hourlyRate: 14000, description: 'The pinnacle of ultra-long-range business aviation, connecting any two cities non-stop.', features: ['Multiple cabin zones', 'Private stateroom', 'Full-size galley', 'Shower onboard'], image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800' }
      ]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="fxselect-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1600" alt="FXSELECT Fleet" />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <p className="section-eyebrow"><span className="gold-line"></span>Curated Fleet</p>
          <h1>FXSELECT <em>Aircraft</em></h1>
          <p className="page-hero-desc">
            Exclusive access to premium aircraft that meet FXAIR's rigorous standards for
            quality, safety, and passenger experience.
          </p>
        </div>
      </section>

      {/* Aircraft detail list */}
      <section className="section fxselect-fleet">
        <div className="container">
          <div className="fxselect-intro fade-in">
            <div className="divider"></div>
            <p>
              Our FXSELECT fleet represents the finest private jets available today. Each aircraft
              is meticulously maintained and crewed by only the most experienced aviation
              professionals, ensuring every flight delivers the FXAIR standard.
            </p>
          </div>

          {loading ? (
            <div className="loading">Loading fleet...</div>
          ) : (
            <div className="fxselect-list">
              {aircraft.map((plane, i) => (
                <div key={plane.id} className={`fxselect-item ${i % 2 === 1 ? 'fxselect-item-reverse' : ''}`}>
                  <div className="fxselect-item-image">
                    <img
                      src={plane.image}
                      alt={plane.name}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800'; }}
                    />
                    <div className="fxselect-badge-abs">FXSELECT</div>
                  </div>
                  <div className="fxselect-item-info">
                    <span className="fxselect-category">{plane.category}</span>
                    <h2 className="fxselect-name">{plane.name}</h2>
                    <p className="fxselect-desc">{plane.description}</p>

                    <div className="fxselect-stats">
                      <div className="stat-block">
                        <span className="stat-num">{plane.passengers}</span>
                        <span className="stat-lbl">Passengers</span>
                      </div>
                      <div className="stat-block">
                        <span className="stat-num">{plane.range?.toLocaleString()}</span>
                        <span className="stat-lbl">Range (nm)</span>
                      </div>
                      <div className="stat-block">
                        <span className="stat-num">{plane.speed}</span>
                        <span className="stat-lbl">Speed (kt)</span>
                      </div>
                    </div>

                    <ul className="fxselect-features">
                      {plane.features?.map(f => (
                        <li key={f}><span className="gold-line" style={{ width: '20px', marginRight: '8px' }}></span>{f}</li>
                      ))}
                    </ul>

                    <Link to="/en-us/contact" className="btn btn-outline-gold">Request This Aircraft</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FXSelect;
