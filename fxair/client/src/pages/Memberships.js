import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Memberships.css';

const Memberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/memberships')
      .then(r => r.json())
      .then(data => { if (data.success) setMemberships(data.data); })
      .catch(() => setMemberships([
        {
          id: '1', name: 'Aviator', tagline: 'Preferred Access',
          features: ['Preferred access to FXSELECT aircraft', 'Fixed predictable rates', 'Priority booking', 'Dedicated account manager', 'Complimentary in-flight catering', '24/7 concierge service'],
          aircraft: ['Phenom 300', 'Challenger 300'], color: '#C9A96E'
        },
        {
          id: '2', name: 'Aviator+', tagline: 'Guaranteed Access', recommended: true,
          features: ['Guaranteed access to all FXSELECT aircraft', 'Ultra-fixed predictable rates', 'Same-day booking available', 'Dedicated senior account manager', 'Premium in-flight catering', '24/7 white-glove concierge', 'Global Express access included', 'Helicopter transfers included'],
          aircraft: ['Phenom 300', 'Challenger 300', 'Global Express'], color: '#1A1A1A'
        }
      ]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="memberships-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1600" alt="Memberships" />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <p className="section-eyebrow"><span className="gold-line"></span>Exclusive Programs</p>
          <h1>Premium Private Jet <em>Memberships</em></h1>
          <p className="page-hero-desc">
            Tiered membership models offering preferred and guaranteed access to specific
            aircraft types at predictable fixed rates.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="section membership-plans">
        <div className="container">
          {loading ? (
            <div className="loading">Loading membership plans...</div>
          ) : (
            <div className="plans-grid">
              {memberships.map(plan => (
                <div key={plan.id} className={`plan-card ${plan.recommended ? 'plan-recommended' : ''}`}>
                  {plan.recommended && (
                    <div className="plan-badge">Most Exclusive</div>
                  )}
                  <div className="plan-header">
                    <h2 className="plan-name">{plan.name}</h2>
                    <p className="plan-tagline">{plan.tagline}</p>
                  </div>
                  <div className="plan-divider"></div>
                  <ul className="plan-features">
                    {plan.features.map((f, i) => (
                      <li key={i} className="plan-feature">
                        <span className="feature-check">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="plan-aircraft">
                    <span className="plan-aircraft-label">Included Aircraft</span>
                    <div className="plan-aircraft-list">
                      {plan.aircraft.map((a, i) => (
                        <span key={i} className="aircraft-tag">{a}</span>
                      ))}
                    </div>
                  </div>
                  <Link to="/en-us/contact" className={`btn ${plan.recommended ? 'btn-primary' : 'btn-outline-gold'} plan-cta`}>
                    Inquire Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why section */}
      <section className="section membership-why">
        <div className="container">
          <div className="why-grid">
            <div>
              <p className="section-eyebrow"><span className="gold-line"></span>Why Membership</p>
              <h2>The Smarter Way <em>To Fly Privately</em></h2>
            </div>
            <div className="why-points">
              {[
                ['Predictable Pricing', 'Lock in rates and eliminate the variability of on-demand spot pricing.'],
                ['Priority Access', 'Your aircraft is available when you need it, not when others release it.'],
                ['Dedicated Team', 'Your account manager knows your preferences before you even ask.'],
                ['Consistent Quality', 'The same standards, the same aircraft, the same service every time.']
              ].map(([title, desc]) => (
                <div key={title} className="why-point">
                  <div className="why-dot"></div>
                  <div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Memberships;
