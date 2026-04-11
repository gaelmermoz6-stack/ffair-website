import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const { register } = useAuth();
  const navigate     = useNavigate();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', password: '', confirmPassword: ''
  });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('Les mots de passe ne correspondent pas');
    }
    if (form.password.length < 6) {
      return setError('Le mot de passe doit faire au moins 6 caractères');
    }

    setLoading(true);
    try {
      const data = await register(form);
      if (data.success) {
        navigate('/');
      } else {
        setError(data.error || 'Erreur lors de la création du compte');
      }
    } catch {
      setError('Erreur réseau. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <img src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1600" alt="FXAIR" />
        <div className="auth-bg-overlay"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          {/* Logo */}
          <Link to="/" className="auth-logo">FXAIR</Link>
          <p className="auth-tagline">Créez votre compte</p>

          {error && (
            <div className="auth-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-row">
              <div className="auth-field">
                <label>Prénom *</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Jean"
                  required
                  autoComplete="given-name"
                />
              </div>
              <div className="auth-field">
                <label>Nom *</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Dupont"
                  required
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jean.dupont@email.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label>Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                autoComplete="tel"
              />
            </div>

            <div className="auth-row">
              <div className="auth-field">
                <label>Mot de passe *</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 caractères"
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="auth-field">
                <label>Confirmer *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Répétez le mot de passe"
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-btn"
              disabled={loading}
            >
              {loading ? 'Création en cours...' : 'Créer mon compte'}
            </button>
          </form>

          <div className="auth-divider"><span>ou</span></div>

          <p className="auth-switch">
            Vous avez déjà un compte ?{' '}
            <Link to="/login">Se connecter</Link>
          </p>

          <p className="auth-terms">
            En créant un compte, vous acceptez nos{' '}
            <Link to="/en-us/legal">Conditions d'utilisation</Link>{' '}
            et notre{' '}
            <Link to="/en-us/privacy-policy">Politique de confidentialité</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
