import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Destinations.css';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/destinations')
      .then(r => r.json())
      .then(data => { if (data.success) setDestinations(data.data); })
      .catch(() => setDestinations([
        { id: '1', slug: 'los-angeles', name: 'Los Angeles, CA', image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800', travelTime: '5h from NY', highlights: ['Hollywood Hills', 'Beverly Hills', 'Santa Monica'] },
        { id: '2', slug: 'new-york-ny', name: 'New York, NY', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', travelTime: 'Hub', highlights: ['Manhattan', 'The Hamptons', 'Greenwich'] },
        { id: '3', slug: 'miami', name: 'Miami, FL', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', travelTime: '3h from NY', highlights: ['South Beach', 'Brickell', 'Coconut Grove'] },
        { id: '4', slug: 'aspen', name: 'Aspen, CO', image: 'https://images.unsplash.com/photo-1551524164-6cf2ac531eb6?w=800', travelTime: '4h from NY', highlights: ['Aspen Mountain', 'Snowmass', 'Vail'] },
        { id: '5', slug: 'las-vegas', name: 'Las Vegas, NV', image: 'https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?w=800', travelTime: '5h from NY', highlights: ['The Strip', 'Summerlin', 'Henderson'] }
      ]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="destinations-page">
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600" alt="Destinations" />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <p className="section-eyebrow"><span className="gold-line"></span>Where We Fly</p>
          <h1>Discover <em>Our Destinations</em></h1>
          <p className="page-hero-desc">
            Whether local or global, FXAIR connects you to the world's most sought-after
            destinations with premium, on-demand charter service.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading">Loading destinations...</div>
          ) : (
            <div className="dest-masonry">
              {destinations.map((dest, i) => (
                <Link
                  to={`/en-us/destinations/${dest.slug}`}
                  key={dest.id}
                  className={`dest-item ${i === 0 ? 'dest-featured' : ''}`}
                >
                  <div className="dest-item-image">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800'; }}
                    />
                    <div className="dest-item-overlay"></div>
                  </div>
                  <div className="dest-item-info">
                    <span className="dest-travel-time">{dest.travelTime}</span>
                    <h2 className="dest-item-name">{dest.name}</h2>
                    <div className="dest-highlights">
                      {dest.highlights?.slice(0,3).map(h => (
                        <span key={h} className="highlight-tag">{h}</span>
                      ))}
                    </div>
                    <span className="dest-item-cta">Explore →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Destinations;
