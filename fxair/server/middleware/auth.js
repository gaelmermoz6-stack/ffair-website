const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// Middleware — vérifie le token JWT
const protect = async (req, res, next) => {
  let token;

  // Cherche le token dans le header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Accès non autorisé. Veuillez vous connecter.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Utilisateur introuvable' });
    }

    if (!req.user.isActive) {
      return res.status(401).json({ success: false, error: 'Compte désactivé' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Token invalide ou expiré' });
  }
};

// Middleware — réservé aux admins
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ success: false, error: 'Accès réservé aux administrateurs' });
};

module.exports = { protect, adminOnly };
