const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in .env');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`\n  ✅ MongoDB Atlas Connected\n  📦 Host : ${conn.connection.host}\n  📂 DB   : ${conn.connection.name}\n`);

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB Atlas disconnected');
    });
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB error:', err.message);
    });

  } catch (error) {
    console.error(`\n❌ MongoDB Atlas connection failed: ${error.message}`);
    console.log('\n👉 Vérifie :\n  1. MONGODB_URI est dans server/.env\n  2. Ton IP est dans Atlas > Network Access\n  3. Le mot de passe est correct\n');
    process.exit(1);
  }
};

module.exports = connectDB;
