import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.scss'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      {/* Logo — left */}
      <NavLink to="/" className="navbar__logo" onClick={() => setOpen(false)}>
        <span>Pulse</span>
      </NavLink>

      {/* Links — center */}
      <ul className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
        {[['/', 'Home'], ['/about', 'About'], ['/work', 'Work'], ['/services', 'Services'], ['/contact', 'Contact']].map(([to, label]) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right — contact + hamburger */}
      <div className="navbar__right">
        <NavLink to="/contact" className="navbar__contact" onClick={() => setOpen(false)}>
          Start a Project
        </NavLink>
        <button
          className={`navbar__burger ${open ? 'navbar__burger--open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
