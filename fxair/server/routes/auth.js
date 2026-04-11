const express = require('express');
const jwt     = require('jsonwebtoken');
const router  = express.Router();
const User    = require('../models/User');
const { protect } = require('../middleware/auth');

// Génère un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// ── POST /api/auth/register ───────────────
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

  // Validations
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Prénom, nom, email et mot de passe sont obligatoires'
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      error: 'Les mots de passe ne correspondent pas'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Le mot de passe doit faire au moins 6 caractères'
    });
  }

  try {
    // Vérifie si l'email existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Un compte avec cet email existe déjà'
      });
    }

    // Crée l'utilisateur (le mot de passe est hashé automatiquement par le model)
    const user = await User.create({
      firstName: firstName.trim(),
      lastName:  lastName.trim(),
      email:     email.trim().toLowerCase(),
      phone:     phone?.trim(),
      password
    });

    const token = generateToken(user._id);

    console.log(`✅ New user registered: ${email} [ID: ${user._id}]`);

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      token,
      user: user.toPublic()
    });

  } catch (err) {
    // Erreur duplicate key MongoDB
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Un compte avec cet email existe déjà'
      });
    }
    console.error('Register error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── POST /api/auth/login ──────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email et mot de passe sont obligatoires'
    });
  }

  try {
    // Cherche l'utilisateur avec le mot de passe (select: false par défaut)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Email ou mot de passe incorrect'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Ce compte a été désactivé'
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Email ou mot de passe incorrect'
      });
    }

    // Met à jour la date de dernière connexion
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = generateToken(user._id);

    console.log(`🔐 User logged in: ${email}`);

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      user: user.toPublic()
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── GET /api/auth/me ──────────────────────
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    user: req.user.toPublic()
  });
});

// ── PUT /api/auth/profile ─────────────────
router.put('/profile', protect, async (req, res) => {
  const { firstName, lastName, phone } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, phone },
      { new: true, runValidators: true }
    );
    res.json({ success: true, user: user.toPublic() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── PUT /api/auth/change-password ─────────
router.put('/change-password', protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, error: 'Les deux mots de passe sont requis' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, error: 'Le nouveau mot de passe doit faire au moins 6 caractères' });
  }

  try {
    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Mot de passe actuel incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Mot de passe modifié avec succès' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
