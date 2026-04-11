import React from 'react';
import { Link } from 'react-router-dom';
import './PremiumCharter.css';

const PremiumCharter = () => {
  return (
    <div className="premium-page">
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="https://images.unsplash.com/photo-1583396618422-6005fa3a4700?w=1600" alt="Premium Charter" />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <p className="section-eyebrow"><span className="gold-line"></span>The FXAIR Difference</p>
          <h1>The Premium <em>Charter Experience</em></h1>
          <p className="page-hero-desc">
            Elevating every aspect of private aviation through relentless consistency, curated aircraft, and white-glove service.
          </p>
        </div>
      </section>

      <section className="section premium-body">
        <div className="container">
          <div className="premium-intro fade-in">
            <p className="section-eyebrow"><span className="gold-line"></span>Our Approach</p>
            <h2>On-Demand <em>Expertly Executed</em></h2>
            <p>
              At FXAIR, we specialize in delivering an elevated way to fly privately by integrating
              unmatched consistency with an extensive network of elite aviation providers and seamless,
              sophisticated service from start to finish.
            </p>
          </div>

          <div className="premium-pillars">
            {[
              { title: 'Always Consistent', desc: 'We hold every flight to the same exceptional standard — regardless of route, aircraft, or operator. Our rigorous vetting and oversight processes mean you receive the same premium experience whether you\'re flying coast-to-coast or internationally.' },
              { title: 'Access to Premium Aircraft', desc: 'Our curated network of FXSELECT aircraft and selectively procured third-party jets gives you access to the finest private aviation assets available, maintained to the highest standards.' },
              { title: 'White Glove Service', desc: 'From the moment you request a flight to the time you land, our dedicated team anticipates your needs and ensures every detail is handled with precision and care.' },
              { title: 'Transparent Pricing', desc: 'No hidden fees, no surprises. FXAIR is committed to clear, transparent pricing that reflects the true value of the premium experience you receive.' }
            ].map(({ title, desc }) => (
              <div key={title} className="premium-pillar fade-in">
                <div className="premium-pillar-number"></div>
                <div className="premium-pillar-content">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="premium-cta fade-in">
            <h2>Ready to Fly <em>Differently?</em></h2>
            <div className="premium-cta-buttons">
              <Link to="/en-us/contact" className="btn btn-primary">Request a Charter</Link>
              <Link to="/en-us/memberships" className="btn btn-outline">Explore Memberships</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumCharter;
