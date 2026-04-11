const mongoose = require('mongoose');
const { Schema } = mongoose;

// ── FlightRequest ─────────────────────────
const flightRequestSchema = new Schema({
  from:           { type: String, required: true, trim: true },
  to:             { type: String, required: true, trim: true },
  departure:      { type: String, required: true },
  returnDate:     { type: String, default: null },
  passengers:     { type: Number, default: 1, min: 1, max: 14 },
  tripType:       { type: String, enum: ['one-way', 'round-trip'], default: 'one-way' },
  status:         { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  estimatedPrice: { type: Number },
  clientName:     { type: String, trim: true },
  clientEmail:    { type: String, trim: true, lowercase: true },
  clientPhone:    { type: String, trim: true },
  notes:          { type: String, trim: true }
}, {
  timestamps: true,
  collection: 'flight_requests'
});

// ── ContactMessage ────────────────────────
const contactSchema = new Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, trim: true, lowercase: true },
  phone:   { type: String, trim: true },
  subject: { type: String, trim: true },
  message: { type: String, required: true, trim: true },
  status:  { type: String, enum: ['new', 'read', 'replied'], default: 'new' }
}, {
  timestamps: true,
  collection: 'contact_messages'
});

// ── MembershipInquiry ─────────────────────
const membershipInquirySchema = new Schema({
  name:           { type: String, required: true, trim: true },
  email:          { type: String, required: true, trim: true, lowercase: true },
  phone:          { type: String, trim: true },
  membershipId:   { type: String, required: true },
  membershipName: { type: String, trim: true },
  message:        { type: String, trim: true },
  status:         { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' }
}, {
  timestamps: true,
  collection: 'membership_inquiries'
});

// Index email pour recherche rapide
contactSchema.index({ email: 1 });
flightRequestSchema.index({ status: 1, createdAt: -1 });
membershipInquirySchema.index({ email: 1 });

const FlightRequest      = mongoose.model('FlightRequest',      flightRequestSchema);
const ContactMessage     = mongoose.model('ContactMessage',     contactSchema);
const MembershipInquiry  = mongoose.model('MembershipInquiry',  membershipInquirySchema);

module.exports = { FlightRequest, ContactMessage, MembershipInquiry };
