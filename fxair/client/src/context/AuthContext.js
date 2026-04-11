import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(localStorage.getItem('fxair_token'));
  const [loading, setLoading] = useState(true);

  // Vérifie le token au démarrage
  useEffect(() => {
    const verifyToken = async () => {
      const savedToken = localStorage.getItem('fxair_token');
      if (!savedToken) { setLoading(false); return; }

      try {
        const res  = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${savedToken}` }
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          setToken(savedToken);
        } else {
          localStorage.removeItem('fxair_token');
          setToken(null);
        }
      } catch {
        localStorage.removeItem('fxair_token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  // Inscription
  const register = useCallback(async (formData) => {
    const res  = await fetch('/api/auth/register', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('fxair_token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  }, []);

  // Connexion
  const login = useCallback(async (email, password) => {
    const res  = await fetch('/api/auth/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('fxair_token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  }, []);

  // Déconnexion
  const logout = useCallback(() => {
    localStorage.removeItem('fxair_token');
    setToken(null);
    setUser(null);
  }, []);

  const value = { user, token, loading, register, login, logout, isAuthenticated: !!user };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return ctx;
};

export default AuthContext;
