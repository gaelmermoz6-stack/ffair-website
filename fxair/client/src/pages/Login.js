import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const { login }    = useAuth();
  const navigate     = useNavigate();
  const location     = useLocation();

  // Redirige vers la page demandée après connexion
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      if (data.success) {
        navigate(from, { replace: true });
      } else {
        setError(data.error || 'Email ou mot de passe incorrect');
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
        <img src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600" alt="FXAIR" />
        <div className="auth-bg-overlay"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <Link to="/" className="auth-logo">FXAIR</Link>
          <p className="auth-tagline">Bienvenue</p>

          {error && (
            <div className="auth-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
                autoComplete="email"
                autoFocus
              />
            </div>

            <div className="auth-field">
              <label>Mot de passe *</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-btn"
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="auth-divider"><span>ou</span></div>

          <p className="auth-switch">
            Pas encore de compte ?{' '}
            <Link to="/register">Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
