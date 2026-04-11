import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FlightBooking from '../components/FlightBooking';
import './DestinationDetail.css';

const DestinationDetail = () => {
  const { slug } = useParams();
  const [dest, setDest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/destinations/${slug}`)
      .then(r => r.json())
      .then(data => { if (data.success) setDest(data.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="loading" style={{ paddingTop: '120px' }}>Loading destination...</div>;
  if (!dest) return (
    <div className="page-not-found">
      <div className="container">
        <h2>Destination not found</h2>
        <Link to="/en-us/destinations" className="btn btn-outline-gold">Back to Destinations</Link>
      </div>
    </div>
  );

  return (
    <div className="dest-detail-page">
      {/* Hero */}
      <section className="dest-detail-hero">
        <div className="dest-detail-hero-bg">
          <img src={dest.image} alt={dest.name} />
          <div className="dest-detail-overlay"></div>
        </div>
        <div className="container dest-detail-hero-content">
          <Link to="/en-us/destinations" className="back-link">← All Destinations</Link>
          <span className="dest-label">Featured Destination</span>
          <h1>{dest.name}</h1>
          <p className="dest-detail-desc">{dest.description}</p>
        </div>
      </section>

      {/* Book a flight */}
      <section className="section dest-book">
        <div className="container">
          <h2>Fly to <em>{dest.name}</em></h2>
          <p style={{ marginTop: 16, marginBottom: 40, color: 'var(--color-gray-light)' }}>
            Request your private charter to {dest.name} today.
          </p>
          <FlightBooking />
        </div>
      </section>

      {/* Highlights */}
      <section className="section">
        <div className="container">
          <div className="dest-info-grid">
            <div>
              <p className="section-eyebrow"><span className="gold-line"></span>Highlights</p>
              <div className="dest-highlights-large">
                {dest.highlights?.map(h => (
                  <div key={h} className="highlight-item">
                    <span className="highlight-dot"></span>
                    {h}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="section-eyebrow"><span className="gold-line"></span>Nearby Airports</p>
              <div className="dest-airports">
                {dest.airports?.map(a => (
                  <div key={a} className="airport-item">
                    <span className="airport-code">{a}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="section-eyebrow"><span className="gold-line"></span>Travel Time</p>
              <p className="travel-time-large">{dest.travelTime}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
