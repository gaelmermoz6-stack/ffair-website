import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch {
      setError('Unable to submit. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1600" alt="Contact" />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <p className="section-eyebrow"><span className="gold-line"></span>We're Here</p>
          <h1>Get in <em>Touch</em></h1>
          <p className="page-hero-desc">
            Our charter specialists are available around the clock to assist you.
          </p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div className="contact-info-col">
              <div className="contact-info-block">
                <p className="section-eyebrow"><span className="gold-line"></span>Our Office</p>
                <address className="contact-address-block">
                  <p>299 Park Avenue</p>
                  <p>3rd Floor</p>
                  <p>New York, NY 10171</p>
                </address>
              </div>

              <div className="contact-info-block">
                <p className="section-eyebrow"><span className="gold-line"></span>Call Us</p>
                <a href="tel:18667261222" className="contact-big-phone">1-866-726-1222</a>
                <p className="contact-hours">Available 24 hours / 7 days</p>
              </div>

              <div className="contact-info-block">
                <p className="section-eyebrow"><span className="gold-line"></span>Download the App</p>
                <div className="contact-app-links">
                  <a href="https://play.google.com/store/apps/details?id=com.skyjet.skyjet" target="_blank" rel="noopener noreferrer" className="app-badge">Google Play</a>
                  <a href="https://apps.apple.com/us/app/id1023383628" target="_blank" rel="noopener noreferrer" className="app-badge">App Store</a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-col">
              {submitted ? (
                <div className="contact-success">
                  <div className="success-icon">✓</div>
                  <h3>Message Received</h3>
                  <p>A charter specialist will contact you shortly.</p>
                  <button className="btn btn-outline-gold" onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              ) : (
                <>
                  <h2 className="contact-form-title">Send a Message</h2>
                  {error && <p className="form-error">{error}</p>}
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Smith" required />
                      </div>
                      <div className="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="form-group">
                        <label>Subject</label>
                        <select name="subject" value={form.subject} onChange={handleChange}>
                          <option value="">Select a topic</option>
                          <option value="charter">Charter Inquiry</option>
                          <option value="membership">Membership</option>
                          <option value="fxselect">FXSELECT Aircraft</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your travel needs..." rows={6} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
