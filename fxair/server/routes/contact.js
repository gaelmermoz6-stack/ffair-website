const express = require('express');
const router  = express.Router();
const { ContactMessage } = require('../models');

// POST nouveau message → sauvegardé dans Atlas
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Nom, email et message sont obligatoires'
    });
  }

  try {
    const contact = await ContactMessage.create({
      name:    name.trim(),
      email:   email.trim().toLowerCase(),
      phone:   phone?.trim(),
      subject: subject?.trim(),
      message: message.trim()
    });

    console.log(`📩 New contact message saved from ${email} [ID: ${contact._id}]`);

    res.status(201).json({
      success: true,
      message: 'Message reçu. Un spécialiste vous contactera sous peu.',
      referenceId: `CTX-${contact._id}`
    });
  } catch (err) {
    console.error('Contact error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET tous les messages (admin)
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET message par ID
router.get('/:id', async (req, res) => {
  try {
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) return res.status(404).json({ success: false, error: 'Message introuvable' });
    res.json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH marquer comme lu/répondu
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  if (!['new', 'read', 'replied'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Statut invalide' });
  }
  try {
    const updated = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
