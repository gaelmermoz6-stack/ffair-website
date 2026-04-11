import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FlightBooking from '../components/FlightBooking';
import AircraftGrid from '../components/AircraftGrid';
import './Home.css';

const Home = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="home">
      {/* ── Hero ─────────────────────────────── */}
      <section className="hero">
        <div className="hero-media">
          <div className="hero-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80"
            alt="Private Jet"
            className="hero-bg"
          />
        </div>

        <div className="hero-content container">
          <div className="hero-text fade-in">
            <h1 className="hero-title">
              <em>The Pinnacle of</em><br />
              Private Jet Charter
            </h1>
            <p className="hero-subtitle">
              Private Aviation's One and Only<br />
              Premium, On-Demand Charter Provider
            </p>
          </div>

          <div className="hero-booking fade-in">
            <FlightBooking />
          </div>
        </div>
      </section>

      {/* ── On-Demand Section ────────────────── */}
      <section className="section on-demand">
        <div className="container">
          <div className="on-demand-grid">
            <div className="on-demand-text fade-in">
              <p className="section-eyebrow"><span className="gold-line"></span>On-Demand</p>
              <h2><em>Expertly Executed</em></h2>
              <p className="on-demand-desc">
                At FXAIR, we specialize in delivering an elevated way to fly privately
                by integrating unmatched consistency with an extensive network of elite
                aviation providers and seamless, sophisticated service from start to finish.
              </p>
              <Link to="/en-us/premium-charter" className="btn btn-outline-gold">
                Discover the FXAIR difference
              </Link>
            </div>

            <div className="on-demand-pillars fade-in">
              <div className="pillar">
                <div className="pillar-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="19" stroke="#C9A96E" strokeWidth="1"/>
                    <path d="M20 10 L20 20 L26 26" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4>Always Consistent</h4>
                <p>Predictable, repeatable service quality on every flight, every time.</p>
              </div>

              <div className="pillar">
                <div className="pillar-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="19" stroke="#C9A96E" strokeWidth="1"/>
                    <path d="M8 24 Q14 16 20 20 Q26 24 32 16" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
                <h4>Access to Premium Aircraft</h4>
                <p>An extensive network of elite, selectively procured aviation providers.</p>
              </div>

              <div className="pillar">
                <div className="pillar-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="19" stroke="#C9A96E" strokeWidth="1"/>
                    <path d="M13 20 L17 24 L27 16" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4>White Glove Service</h4>
                <p>Sophisticated, seamless concierge from booking to landing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Membership CTA ───────────────────── */}
      <section className="membership-cta">
        <div className="membership-cta-image">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80"
            alt="Private Jet Membership"
          />
          <div className="membership-cta-overlay"></div>
        </div>
        <div className="container">
          <div className="membership-cta-content fade-in">
            <p className="section-eyebrow"><span className="gold-line"></span>Premium Private Jet</p>
            <h2><em>Memberships</em></h2>
            <p>
              Join our exclusive tiered-membership models, the Aviator and Aviator+ programs
              that offer preferred and guaranteed access to specific aircraft types at
              predictable fixed rates.
            </p>
            <Link to="/en-us/memberships" className="btn btn-outline">
              Explore Membership
            </Link>
          </div>
        </div>
      </section>

      {/* ── Aircraft Fleet ───────────────────── */}
      <section className="section fleet-section">
        <div className="container">
          <div className="section-header fade-in">
            <p className="section-eyebrow"><span className="gold-line"></span>Premium Private Jets</p>
            <h2><em>On-Demand</em></h2>
            <p className="section-desc">
              Ready when you are, FXAIR provides exclusive access to FXSelect aircraft
              including the Phenom 300, Challenger 300 and Global Express and a network
              of selectively procured aircraft from only the world's most proven operators.
            </p>
          </div>
          <AircraftGrid />
        </div>
      </section>

      {/* ── Destinations ─────────────────────── */}
      <section className="section destinations-section">
        <div className="container">
          <div className="section-header fade-in">
            <p className="section-eyebrow"><span className="gold-line"></span>Let FXAIR Take You There</p>
            <h2>
              Whether local or global, with FXAIR, your direct flight is on-demand.
            </h2>
          </div>

          <div className="destinations-grid fade-in">
            <DestinationCard
              title="Los Angeles, CA"
              slug="los-angeles"
              image="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800"
              label="Featured Destination"
            />
            <DestinationCard
              title="New York, NY"
              slug="new-york-ny"
              image="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800"
              label="Featured Destination"
            />
            <DestinationCard
              title="Miami, FL"
              slug="miami"
              image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
              label="Featured Destination"
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/en-us/destinations" className="btn btn-outline-gold">
              Explore Where
            </Link>
          </div>
        </div>
      </section>

      {/* ── Standard Section ─────────────────── */}
      <section className="standard-section fade-in">
        <div className="standard-image">
          <img
            src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1400"
            alt="FXSELECT Standard"
          />
          <div className="standard-overlay"></div>
        </div>
        <div className="container standard-content">
          <h2>A Standard <em>Uncommon In Charter</em></h2>
          <Link to="/en-us/fxselect" className="btn btn-outline">Explore FXSELECT</Link>
        </div>
      </section>

      {/* ── Resources ────────────────────────── */}
      <section className="section resources-section">
        <div className="container">
          <div className="section-header fade-in">
            <h2>Resources</h2>
            <p className="section-desc">
              Stay up to date with the latest on our approach to premium on-demand charter aviation.
            </p>
          </div>

          <div className="resources-grid fade-in">
            <ResourceCard
              category="Blog"
              title="Flight Frequencies"
              desc="Explore the world of private aviation using FXAIR's expertise. Read up on educational content with program or aircraft analysis along with insider lifestyle content."
              link="/en-us/blog"
              linkText="Read More"
              image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600"
            />
            <ResourceCard
              category="Careers"
              title="Take Your Career to New Heights"
              desc="Explore opportunities to work with a leading player in the private jet charter industry. Apply now and take your career to new heights with FXAIR."
              link="https://fxair.hrmdirect.com"
              linkText="Read More"
              image="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600"
              external
            />
            <ResourceCard
              category="News"
              title="Our Airwaves"
              desc="Stay up to date with FXAIR announcements, press releases, media features and industry news."
              link="/en-us/news"
              linkText="Read More"
              image="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=600"
            />
          </div>
        </div>
      </section>

      {/* ── Contact Banner ───────────────────── */}
      <section className="contact-banner fade-in">
        <div className="container">
          <div className="contact-banner-inner">
            <div className="contact-info">
              <p className="contact-address">299 Park Avenue, 3rd Floor, New York, NY 10171</p>
              <a href="tel:18667261222" className="contact-phone">T: 1-866-726-1222</a>
            </div>
            <Link to="/en-us/contact" className="btn btn-outline-gold">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const DestinationCard = ({ title, slug, image, label }) => (
  <Link to={`/en-us/destinations/${slug}`} className="destination-card">
    <div className="destination-image-wrap">
      <img src={image} alt={title} className="destination-image" />
      <div className="destination-overlay"></div>
    </div>
    <div className="destination-info">
      <span className="destination-label">{label}</span>
      <h3 className="destination-name">{title}</h3>
      <span className="destination-explore">Explore →</span>
    </div>
  </Link>
);

const ResourceCard = ({ category, title, desc, link, linkText, image, external }) => (
  <div className="resource-card">
    <div className="resource-image-wrap">
      <img src={image} alt={title} className="resource-image" />
    </div>
    <div className="resource-body">
      <span className="resource-category">{category}</span>
      <h3 className="resource-title">{title}</h3>
      <p className="resource-desc">{desc}</p>
      {external
        ? <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold btn-sm">{linkText}</a>
        : <Link to={link} className="btn btn-outline-gold btn-sm">{linkText}</Link>
      }
    </div>
  </div>
);

export default Home;
