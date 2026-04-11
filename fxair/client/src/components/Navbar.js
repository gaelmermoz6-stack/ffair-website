import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-inner">
        {/* Left */}
        <div className="nav-left">
          <Link to="/en-us/premium-charter" className="nav-link">Premium Experience</Link>
          <Link to="/en-us/memberships"     className="nav-link">Memberships</Link>
        </div>

        {/* Logo */}
        <Link to="/" className="nav-logo">
          <div className="logo-wordmark">FXAIR</div>
        </Link>

        {/* Right */}
        <div className="nav-right">
          <Link to="/en-us/destinations" className="nav-link">Destinations</Link>
          <Link to="/en-us/fxselect"     className="nav-link">FXSELECT Aircraft</Link>

          {isAuthenticated ? (
            <div className="nav-user">
              <span className="nav-user-name">
                {user?.firstName} {user?.lastName}
              </span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="nav-auth-links">
              <Link to="/login"    className="nav-link nav-login">Connexion</Link>
              <Link to="/register" className="btn btn-primary btn-sm">S'inscrire</Link>
            </div>
          )}

          <Link to="/en-us/contact" className="btn btn-outline btn-sm">Contact</Link>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          <Link to="/en-us/premium-charter" className="mobile-link">Premium Experience</Link>
          <Link to="/en-us/memberships"     className="mobile-link">Memberships</Link>
          <Link to="/en-us/destinations"    className="mobile-link">Destinations</Link>
          <Link to="/en-us/fxselect"        className="mobile-link">FXSELECT Aircraft</Link>
          <Link to="/en-us/blog"            className="mobile-link">Blog</Link>

          {isAuthenticated ? (
            <>
              <span className="mobile-link mobile-user">
                {user?.firstName} {user?.lastName}
              </span>
              <button className="mobile-link mobile-link-gold" onClick={handleLogout}
                style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', width: '100%', padding: '12px 0', fontFamily: 'inherit' }}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="mobile-link">Connexion</Link>
              <Link to="/register" className="mobile-link mobile-link-gold">S'inscrire</Link>
            </>
          )}

          <Link to="/en-us/contact" className="mobile-link mobile-link-gold">Contact Us</Link>
        </div>
        <div className="mobile-footer">
          <a href="tel:18667261222">T: 1-866-726-1222</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
