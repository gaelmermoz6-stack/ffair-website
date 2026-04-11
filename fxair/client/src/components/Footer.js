import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">FXAIR</div>
              <p className="footer-tagline">Private Aviation's One and Only<br />Premium, On-Demand Charter Provider</p>
              <div className="footer-social">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
              </div>
            </div>

            {/* Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">Fly</h4>
              <nav className="footer-links">
                <Link to="/en-us/premium-charter">Premium Experience</Link>
                <Link to="/en-us/fxselect">FXSELECT Aircraft</Link>
                <Link to="/en-us/destinations">Destinations</Link>
                <Link to="/en-us/memberships">Memberships</Link>
              </nav>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Resources</h4>
              <nav className="footer-links">
                <Link to="/en-us/blog">Flight Frequencies Blog</Link>
                <Link to="/en-us/news">News</Link>
                <a href="https://fxair.hrmdirect.com" target="_blank" rel="noopener noreferrer">Careers</a>
              </nav>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contact</h4>
              <address className="footer-address">
                <p>299 Park Avenue</p>
                <p>3rd Floor</p>
                <p>New York, NY 10171</p>
              </address>
              <a href="tel:18667261222" className="footer-phone">T: 1-866-726-1222</a>

              <div className="footer-apps">
                <p className="footer-col-title" style={{ marginBottom: '12px' }}>Download the App</p>
                <div className="app-badges">
                  <a href="https://play.google.com/store/apps/details?id=com.skyjet.skyjet" target="_blank" rel="noopener noreferrer" className="app-badge">Google Play</a>
                  <a href="https://apps.apple.com/us/app/id1023383628" target="_blank" rel="noopener noreferrer" className="app-badge">App Store</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <div className="footer-bottom-left">
              <span className="footer-brand-group">
                <a href="https://www.fxair.com" className="footer-family-link active">FXAIR</a>
                <span className="separator">|</span>
                <a href="https://www.flexjet.com" target="_blank" rel="noopener noreferrer" className="footer-family-link">FLEXJET</a>
              </span>
            </div>
            <div className="footer-bottom-links">
              <Link to="/en-us/news">News</Link>
              <a href="https://fxair.hrmdirect.com" target="_blank" rel="noopener noreferrer">Careers</a>
              <Link to="/en-us/legal">Terms &amp; Conditions</Link>
              <Link to="/en-us/privacy-policy">Privacy Policy</Link>
              <Link to="/en-us/cookie-policy">Cookie Policy</Link>
            </div>
            <p className="footer-copyright">© {new Date().getFullYear()} FXAIR</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
