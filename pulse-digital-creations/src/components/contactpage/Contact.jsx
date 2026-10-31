import { useState } from 'react'
import './Contact.scss'
import { motion } from 'framer-motion'

const ADDRESS = 'Pop Cottage, 142, HAL Old Airport Rd, behind Manipal Hospital Internal Road, Rustam Bagh Layout, Bengaluru, Karnataka 560017'
const MAP_QUERY = encodeURIComponent(ADDRESS)

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = () => { if (form.name && form.email) setSent(true) }

  return (
    <div className="contact-page">
      <section className="page-hero">
          <p className="page-hero__label">Connect With Us</p>
          <h1 className="page-hero__title">Start a Project</h1>
          <p className="page-hero__sub">
             Tell us about your brand vision. Let's create something legendary together.
          </p>
      </section>

      <div className="container">
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
                   <span>9606030213</span>
                </div>
              </div>

              <div className="info-row">
                <span className="icon">✉</span>
                <div className="text">
                   <label>Email Us</label>
                   <span>pulsedigitalcreations@gmail.com</span>
                </div>
              </div>

              <div className="info-row">
                <span className="icon">🌍</span>
                <div className="text">
                   <label>Location</label>
                   <span>Global Operations</span>
                </div>
              </div>

              <div className="info-row">
                <span className="icon">📍</span>
                <div className="text">
                   <label>Office Address</label>
                   <span>{ADDRESS}</span>
                   <a
                     className="info-row__link"
                     href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                     target="_blank"
                     rel="noopener noreferrer"
                   >
                     Get directions →
                   </a>
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

        <div className="contact-map">
          <iframe
            title="Pulse Digital Creations office location"
            src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
