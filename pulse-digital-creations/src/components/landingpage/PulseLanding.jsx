import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollShowcase from './ScrollShowcase'
import pulseLogo from '../../assets/pulse-logo.png'
import './PulseLanding.scss'


gsap.registerPlugin(ScrollTrigger)

const portfolioItems = [
  {
    id: 1,
    title: '5 Signs Before & After',
    category: 'Before & After',
    videoSrc: '/videos/5-signs-before-after.mp4',
    desc: 'A compelling before-and-after story highlighting five key signs of transformation.',
    accent: '#e85d04',
  },
  {
    id: 2,
    title: 'CA Transformation',
    category: 'Before & After',
    videoSrc: '/videos/before-after-ca.mp4',
    desc: 'A powerful before-and-after showcase produced for a Chartered Accountancy brand.',
    accent: '#e91e8c',
  },
  {
    id: 3,
    title: 'CA Brand Reel',
    category: 'Reels Production',
    videoSrc: '/videos/my-ca-4.mp4',
    desc: 'A dynamic brand reel crafted for a Chartered Accountancy client.',
    accent: '#1a3fff',
  },
  {
    id: 4,
    title: 'CA Desk Story',
    category: 'Reels Production',
    videoSrc: '/videos/my-ca-desk-draft-v1.mp4',
    desc: 'A cinematic desk-side narrative reel built for a Chartered Accountancy brand.',
    accent: '#ffd100',
  },
]

function PortfolioCard({ item, index, onClick }) {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef(null)

  const handleMouseEnter = () => {
    setHovered(true)
    const v = videoRef.current
    if (v) { v.currentTime = 0; v.play().catch(() => {}) }
  }

  const handleMouseLeave = () => {
    setHovered(false)
    const v = videoRef.current
    if (v) v.pause()
  }

  return (
    <div
      className="portfolio-card"
      style={{ '--card-accent': item.accent }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="portfolio-card__thumb">
        <video
          ref={videoRef}
          className="portfolio-card__video"
          src={item.videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
        />

        <span className="portfolio-card__index">{String(index + 1).padStart(2, '0')}</span>

        <div className="portfolio-card__logo-badge">
          <img src={pulseLogo} alt="Pulse Digital Creations" />
        </div>

        {!hovered && (
          <div className="portfolio-card__play">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.65)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
              <polygon points="19,14 37,24 19,34" fill="white" />
            </svg>
          </div>
        )}

        {hovered && (
          <div className="portfolio-card__expand-hint">Click to open ↗</div>
        )}
      </div>

      <div className="portfolio-card__info">
        <span className="portfolio-card__cat" style={{ color: item.accent }}>{item.category}</span>
        <h3 className="portfolio-card__title">{item.title}</h3>
      </div>
    </div>
  )
}

function VideoPopup({ item, items, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(
    items.findIndex(i => i.id === item.id)
  )
  const current = items[currentIndex]

  const goNext = useCallback(() => {
    setCurrentIndex(i => (i + 1) % items.length)
  }, [items.length])

  const goPrev = () => {
    setCurrentIndex(i => (i - 1 + items.length) % items.length)
  }

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        <button className="popup__close" onClick={onClose}>✕</button>
        <button className="popup__nav popup__nav--prev" onClick={goPrev}>‹</button>
        <button className="popup__nav popup__nav--next" onClick={goNext}>›</button>
        <div className="popup__video">
          <video
            key={current.id}
            src={current.videoSrc}
            controls
            autoPlay
            onEnded={goNext}
          />
        </div>
        <div className="popup__info">
          <span className="popup__cat">{current.category}</span>
          <h3 className="popup__title">{current.title}</h3>
          <p className="popup__desc">{current.desc}</p>
          <div className="popup__dots">
            {items.map((it, i) => (
              <button
                key={it.id}
                className={`popup__dot ${i === currentIndex ? 'popup__dot--active' : ''}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PulseLanding() {
  const [popup, setPopup] = useState(null)
  const navigate = useNavigate()

  return (
    <div className="pulse-landing">

      <div className="ambient-bg" aria-hidden="true">
        <span className="ambient-bg__orb ambient-bg__orb--1" />
        <span className="ambient-bg__orb ambient-bg__orb--2" />
        <span className="ambient-bg__orb ambient-bg__orb--3" />
        <span className="ambient-bg__grid" />
      </div>

      <section className="hero">
        <div className="container hero__grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="hero__content"
          >
            <span className="hero__eyebrow">Modern Digital Agency</span>
            <h1 className="hero__title">
              ELEVATE YOUR<br />
              <span className="text-gradient">DIGITAL PULSE</span>
            </h1>
            <p className="hero__subtitle">
              We create high-impact visual stories that command attention and drive results.
            </p>
            <div className="hero__cta">
              <button className="btn btn--gold btn--lg" onClick={() => navigate('/contact')}>Start a Project</button>
              <button className="btn btn--outline" onClick={() => navigate('/work')}>Portfolio</button>
            </div>
            <div className="hero__badges">
              {['Reels Production', 'Branding', 'Motion Graphics', 'Digital Marketing'].map((b) => (
                <span key={b} className="hero__badge">{b}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
            className="hero__visual"
            aria-hidden="true"
          >
            <div className="hero__visual-glow" />
            <div className="pulse-orbit pulse-orbit--outer" />
            <div className="pulse-orbit pulse-orbit--inner" />
            <div className="pulse-core"><span /></div>
            <svg className="pulse-wave" viewBox="0 0 560 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="pulse-wave__glow" d="M0 110H105L135 110L160 62L190 168L225 32L258 110H340L365 78L393 140L425 110H560" />
              <path className="pulse-wave__line" d="M0 110H105L135 110L160 62L190 168L225 32L258 110H340L365 78L393 140L425 110H560" />
            </svg>
            <span className="pulse-node pulse-node--one" />
            <span className="pulse-node pulse-node--two" />
            <span className="pulse-node pulse-node--three" />
          </motion.div>

        </div>

        <div className="hero__scroll-cue">
          <span />
        </div>
      </section>

      <section className="about-split" onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <p className="section-label">Innovative Agency</p>
              <h2 className="section-title">We are Pulse Digital Creations</h2>
              <p className="about-body">
                We are a creative powerhouse specializing in <strong>brand identity</strong>, 
                premium <strong>reels production</strong>, and <strong>digital strategy</strong>. 
                Our mission is to help your brand find its unique rhythm in a crowded digital world.
              </p>
              <button className="btn btn--link">Explore our story →</button>
            </div>
            <div className="about-visual">
               <div className="glass-card">
                  <div className="pulse-icon">⚡</div>
                  <h3>Result Driven</h3>
                  <p>Turning visual excellence into business growth.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollShowcase />

      <section className="portfolio">
        <div className="container">
          <p className="section-label">Our Work</p>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="portfolio__hint">Hover a reel to preview, click to watch in full</p>

          <div className="portfolio__grid">
            {portfolioItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.6 }}
              >
                <PortfolioCard
                  item={item}
                  index={idx}
                  onClick={() => setPopup(item)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <p className="section-label">Expertise</p>
          <h2 className="section-title text-center">Fueling Modern Brands</h2>
          <div className="services-grid">
            {[
              { title: 'Reels Production', color: 'accent', icon: '🎬', desc: 'Cinematic shorts that capture attention.' },
              { title: 'Brand Identity', color: 'dark', icon: '🎨', desc: 'Holistic visual systems that stand out.' },
              { title: 'Motion Graphics', color: 'blue', icon: '✦', desc: 'Dynamic visuals that tell your story.' },
            ].map((s) => (
              <div
                key={s.title}
                className={`svc-card svc-card--${s.color}`}
                onClick={() => navigate('/services')}
              >
                <div className="svc-card__icon">{s.icon}</div>
                <h3 className="svc-card__title">{s.title}</h3>
                <p className="svc-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container">
          <div className="contact-cta__box">
            <h2 className="section-title">Have a project in mind?</h2>
            <p>Let's pulse together and create something legendary.</p>
            <button className="btn btn--gold btn--lg" onClick={() => navigate('/contact')}>
              Let's Connect
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
             <div className="footer-logo">PULSE</div>
             <div className="footer-contact">
                <span>📞 9438536276</span>
                <span>✉ pulsedigitalcreations@gmail.com</span>
             </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Pulse Digital Creations. Boldly local, Global reach.</p>
          </div>
        </div>
      </footer>

      {popup && (
        <VideoPopup
          item={popup}
          items={portfolioItems}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  )
}
