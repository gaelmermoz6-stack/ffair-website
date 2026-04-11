const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Le prénom est obligatoire'],
    trim: true,
    maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
  },
  lastName: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true,
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Email invalide']
  },
  phone: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    minlength: [6, 'Le mot de passe doit faire au moins 6 caractères'],
    select: false  // jamais retourné dans les requêtes par défaut
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true,
  collection: 'users'
});

// Index unique sur email
userSchema.index({ email: 1 }, { unique: true });

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Méthode pour retourner l'utilisateur sans le mot de passe
userSchema.methods.toPublic = function() {
  return {
    _id:       this._id,
    firstName: this.firstName,
    lastName:  this.lastName,
    email:     this.email,
    phone:     this.phone,
    role:      this.role,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('User', userSchema);
