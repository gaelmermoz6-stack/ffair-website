import React, { useState } from 'react';
import './FlightBooking.css';

const FlightBooking = () => {
  const [tripType, setTripType] = useState('one-way');
  const [form, setForm] = useState({
    from: '',
    to: '',
    departure: '',
    returnDate: '',
    passengers: 1
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.departure) return;
    setLoading(true);
    try {
      const response = await fetch('/api/flights/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tripType })
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="booking-widget booking-success">
        <div className="success-icon">✓</div>
        <h3>Request Submitted</h3>
        <p>A charter specialist will contact you shortly to confirm your flight details.</p>
        <button className="btn btn-outline-gold" onClick={() => setSubmitted(false)}>New Request</button>
      </div>
    );
  }

  return (
    <div className="booking-widget">
      {/* Trip type tabs */}
      <div className="trip-type-tabs">
        <button
          className={`trip-tab ${tripType === 'one-way' ? 'active' : ''}`}
          onClick={() => setTripType('one-way')}
          type="button"
        >
          One-way
        </button>
        <button
          className={`trip-tab ${tripType === 'round-trip' ? 'active' : ''}`}
          onClick={() => setTripType('round-trip')}
          type="button"
        >
          Round-trip
        </button>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="booking-fields">
          <div className="booking-field">
            <label className="field-label">From</label>
            <input
              type="text"
              name="from"
              placeholder="Departure city or airport"
              value={form.from}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-divider-vert">
            <span>→</span>
          </div>

          <div className="booking-field">
            <label className="field-label">To</label>
            <input
              type="text"
              name="to"
              placeholder="Arrival city or airport"
              value={form.to}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-field">
            <label className="field-label">Departure</label>
            <input
              type="date"
              name="departure"
              value={form.departure}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {tripType === 'round-trip' && (
            <div className="booking-field">
              <label className="field-label">Return</label>
              <input
                type="date"
                name="returnDate"
                value={form.returnDate}
                onChange={handleChange}
                min={form.departure || new Date().toISOString().split('T')[0]}
              />
            </div>
          )}

          <div className="booking-field booking-field-sm">
            <label className="field-label">Passenger</label>
            <select name="passengers" value={form.passengers} onChange={handleChange}>
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary booking-submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Request Flight'}
          </button>
        </div>

        <div className="booking-footer-note">
          <a href="/en-us/contact" className="multi-city-link">
            Need multiple flights? Switch to multi-city
          </a>
        </div>
      </form>
    </div>
  );
};

export default FlightBooking;
