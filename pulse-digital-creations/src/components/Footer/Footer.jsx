import { NavLink } from 'react-router-dom'
import './Footer.scss'

const links = [['/', 'Home'], ['/about', 'About'], ['/work', 'Work'], ['/services', 'Services'], ['/contact', 'Contact']]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-cta">
          <h2 className="footer-cta-heading">
            Have a project <span>in mind?</span>
          </h2>
          <p className="footer-cta-desc">Let's pulse together and create something legendary.</p>
          <NavLink to="/contact" className="btn-underline">Let's Connect</NavLink>
        </div>

        <div className="footer-links">
          <div className="footer-menu">
            <h4 className="footer-heading">Menu</h4>
            <ul className="footer-menu-list">
              {links.map(([to, label]) => (
                <li key={to}><NavLink to={to}>{label}</NavLink></li>
              ))}
            </ul>
          </div>

          <div className="footer-info">
            <div className="footer-info-grid">
              <div className="footer-col">
                <h4 className="footer-heading">Email</h4>
                <a className="footer-email-link" href="mailto:pulsedigitalcreations@gmail.com">pulsedigitalcreations@gmail.com</a>
              </div>
              <div className="footer-col">
                <h4 className="footer-heading">Phone</h4>
                <a className="footer-text" href="tel:9352073285">9352073285</a>
              </div>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Office</h4>
              <p className="footer-text">Pop Cottage, 142, HAL Old Airport Rd, behind Manipal Hospital Internal Road, Rustam Bagh Layout, Bengaluru, Karnataka 560017</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-brand" aria-hidden="true">
        <span className="footer-brand-text">PULSE</span>
      </div>

      <div className="footer-legal">
        <p>© 2024 Pulse Digital Creations. Boldly local, Global reach.</p>
      </div>
    </footer>
  )
}
