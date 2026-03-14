import { useState } from 'react'
import './Contact.scss'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = () => { if (form.name && form.email) setSent(true) }

  return (
    <div className="contact-page">
      <div className="contact-page__header">
        <p className="contact-page__label">Get In Touch</p>
        <h1 className="contact-page__title">Start a Project</h1>
        <p className="contact-page__sub">Let's create something extraordinary together.</p>
      </div>

      <div className="contact-page__body">
        <div className="contact-page__info">
          <h3>Contact Details</h3>
          <div className="contact-page__row"><span>📞</span><span>9438556276</span></div>
          <div className="contact-page__row"><span>✉</span><span>pulsedigitalcreations</span></div>
          <div className="contact-page__row"><span>📍</span><span>India</span></div>
        </div>

        <div className="contact-page__form">
          {sent ? (
            <div className="contact-page__success">
              <span>✓</span>
              <h3>Message Sent!</h3>
              <p>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Your Name</label>
                <input name="name" value={form.name} onChange={handle} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="email" value={form.email} onChange={handle} placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your project..." rows={5} />
              </div>
              <button className="btn btn--gold btn--lg" onClick={submit}>Send Message</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
