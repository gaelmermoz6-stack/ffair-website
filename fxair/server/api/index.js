const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send('Le serveur tourne enfin !');
});

// Important : Exportez l'instance pour Vercel
module.exports = app;