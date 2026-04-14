const express = require('express');
const app = require('./index'); // Importez l'instance de votre serveur Express


// Important : Exportez l'instance pour Vercel
module.exports = app;