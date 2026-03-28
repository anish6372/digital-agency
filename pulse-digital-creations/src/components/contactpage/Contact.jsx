import { useState } from 'react'
import './Contact.scss'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = () => { if (form.name && form.email) setSent(true) }

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-page__header">
          <p className="section-label">Connect With Us</p>
          <h1 className="section-title">Start a Project</h1>
          <p className="contact-page__sub">
             Tell us about your brand vision. Let's create something legendary together.
          </p>
        </div>

        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="info-box">
              <h3>Office Details</h3>
              <p>Based in India, serving global brands with creative passion.</p>
              
              <div className="info-row">
                <span className="icon">📞</span>
                <div className="text">
                   <label>Call Us</label>
                   <span>9438556276</span>
                </div>
              </div>

              <div className="info-row">
                <span className="icon">✉</span>
                <div className="text">
                   <label>Email Us</label>
                   <span>pulse.digital</span>
                </div>
              </div>

              <div className="info-row">
                <span className="icon">🌍</span>
                <div className="text">
                   <label>Location</label>
                   <span>Global Operations</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {sent ? (
              <div className="success-card">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>One of our creative leads will reach out to you within 24 hours.</p>
                <button className="btn btn--outline" onClick={() => setSent(false)}>Back to Form</button>
              </div>
            ) : (
              <div className="glass-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input name="name" value={form.name} onChange={handle} placeholder="e.g. Alex Graham" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input name="email" value={form.email} onChange={handle} placeholder="e.g. alex@brand.com" />
                </div>
                <div className="form-group">
                  <label>Project Details</label>
                  <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your goals, timeline and budget..." rows={5} />
                </div>
                <button className="btn btn--gold btn--lg btn--full" onClick={submit}>
                   Send My Message
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
