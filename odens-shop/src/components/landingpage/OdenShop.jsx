import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene from './PulseBackground'
import ScrollShowcase from './ScrollShowcase'
import './OdenShop.scss'

gsap.registerPlugin(ScrollTrigger)

// ── Use your real YouTube embed URLs here ──
const portfolioItems = [
  {
    id: 1,
    title: 'Cafe Reel',
    category: 'Reels Production',
    thumb: 'cafe',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    desc: 'A cinematic reel shot for a premium cafe brand showcasing ambiance and product.',
  },
  {
    id: 2,
    title: 'Brand Logo — Chromed',
    category: 'Branding',
    thumb: 'brand',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    desc: 'Full brand identity for Chromed — a specialty coffee brand.',
  },
  {
    id: 3,
    title: 'Cinema FX',
    category: 'Motion Graphics',
    thumb: 'cinema',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    desc: 'High-impact motion graphics package for a film production house.',
  },
  {
    id: 4,
    title: 'Elixir Brand',
    category: 'Branding',
    thumb: 'elixir',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    desc: 'Brand identity and packaging design for Elixir — a premium beverage brand.',
  },
  {
    id: 5,
    title: 'Product Reel',
    category: 'Reels Production',
    thumb: 'product',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    desc: 'Dynamic product video showcasing features and lifestyle appeal.',
  },
]

// Duplicate items so loop feels seamless
const loopedItems = [...portfolioItems, ...portfolioItems, ...portfolioItems]

// ── Thumbnail SVGs ──
function ThumbSVG({ type }) {
  if (type === 'cafe') return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="url(#c1)" />
      <ellipse cx="160" cy="130" rx="55" ry="35" fill="#3a1800" opacity="0.8" />
      <ellipse cx="160" cy="118" rx="44" ry="27" fill="#c87020" />
      <ellipse cx="160" cy="112" rx="34" ry="20" fill="#e89020" />
      <path d="M158 80 Q160 58 162 80" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M153 78 Q155 54 157 78" stroke="#fff" strokeWidth="1.2" fill="none" opacity="0.3" />
      <rect x="105" y="148" width="110" height="12" rx="6" fill="#2a1000" />
      <defs><linearGradient id="c1" x1="0" y1="0" x2="320" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1a0800" /><stop offset="100%" stopColor="#3d1a00" />
      </linearGradient></defs>
    </svg>
  )
  if (type === 'brand') return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="#0a0a0a" />
      <text x="160" y="70" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="serif" letterSpacing="4">CHROMED</text>
      <text x="160" y="95" textAnchor="middle" fill="#888" fontSize="9" letterSpacing="2">HARTLINE COFFEE</text>
      <text x="100" y="135" textAnchor="middle" fill="#e85d04" fontSize="13" fontWeight="600">⊕ ELIXIR</text>
      <text x="220" y="135" textAnchor="middle" fill="#aaa" fontSize="12">✈ HORIZON</text>
      <line x1="40" y1="110" x2="280" y2="110" stroke="#222" strokeWidth="1" />
    </svg>
  )
  if (type === 'cinema') return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="url(#ci1)" />
      <circle cx="160" cy="100" r="65" fill="url(#glow1)" opacity="0.35" />
      <circle cx="160" cy="100" r="32" fill="url(#glow1)" opacity="0.6" />
      <text x="160" y="107" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="serif" letterSpacing="3">CINEMA FX</text>
      <defs>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f48c06" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e85d04" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ci1" x1="0" y1="0" x2="320" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#080400" /><stop offset="100%" stopColor="#1a0d00" />
        </linearGradient>
      </defs>
    </svg>
  )
  if (type === 'elixir') return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="#050a1a" />
      <circle cx="160" cy="90" r="50" fill="none" stroke="url(#eg)" strokeWidth="2" />
      <circle cx="160" cy="90" r="30" fill="rgba(232,93,4,0.15)" />
      <text x="160" y="96" textAnchor="middle" fill="#e85d04" fontSize="20" fontWeight="700" letterSpacing="3">ELIXIR</text>
      <text x="160" y="155" textAnchor="middle" fill="#555" fontSize="10" letterSpacing="4">PREMIUM BRAND</text>
      <defs><linearGradient id="eg" x1="0" y1="0" x2="320" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#e85d04" /><stop offset="100%" stopColor="#f48c06" />
      </linearGradient></defs>
    </svg>
  )
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="#0d1020" />
      <rect x="60" y="50" width="200" height="120" rx="8" fill="#111" stroke="#2a2a3a" strokeWidth="1" />
      <circle cx="160" cy="110" r="38" fill="#0a0a14" stroke="#333" strokeWidth="1.5" />
      <circle cx="160" cy="110" r="22" fill="#111" stroke="#444" strokeWidth="1" />
      <circle cx="160" cy="110" r="10" fill="#161620" />
      <rect x="140" y="55" width="40" height="18" rx="4" fill="#0d0d18" />
      <circle cx="90" cy="65" r="6" fill="#e85d04" opacity="0.7" />
    </svg>
  )
}

// ── Portfolio Card with hover video preview ──
function PortfolioCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false)
  const hoverTimer = useRef(null)

  const handleMouseEnter = () => {
    // Small delay so fast scrolls don't trigger
    hoverTimer.current = setTimeout(() => setHovered(true), 400)
  }

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current)
    setHovered(false)
  }

  // Build autoplay hover URL
  const hoverVideoUrl = item.videoUrl
    + '?autoplay=1&mute=1&controls=0&loop=1&modestbranding=1&rel=0&playlist='
    + item.videoUrl.split('/embed/')[1]

  return (
    <div
      className="portfolio-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="portfolio-card__thumb">
        {/* Thumbnail always visible */}
        <div className={`portfolio-card__svg ${hovered ? 'portfolio-card__svg--hidden' : ''}`}>
          <ThumbSVG type={item.thumb} />
        </div>

        {/* Hover iframe video preview */}
        {hovered && (
          <iframe
            className="portfolio-card__preview"
            src={hoverVideoUrl}
            title={item.title + ' preview'}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
          />
        )}

        {/* Play button overlay (only when not hovered) */}
        {!hovered && (
          <div className="portfolio-card__play">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.65)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
              <polygon points="19,14 37,24 19,34" fill="white" />
            </svg>
          </div>
        )}

        {/* Click to expand hint on hover */}
        {hovered && (
          <div className="portfolio-card__expand-hint">Click to open ↗</div>
        )}
      </div>

      <div className="portfolio-card__info">
        <span className="portfolio-card__cat">{item.category}</span>
        <h3 className="portfolio-card__title">{item.title}</h3>
      </div>
    </div>
  )
}

// ── Popup with auto-advance ──
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

  // Auto-advance URL — YouTube onEnded fires via postMessage
  const popupVideoUrl = current.videoUrl
    + '?autoplay=1&rel=0&modestbranding=1&enablejsapi=1'

  // Listen for YouTube "video ended" via postMessage
  useEffect(() => {
    const handler = (e) => {
      try {
        const data = JSON.parse(e.data)
        // YouTube playerState 0 = ended
        if (data.event === 'onStateChange' && data.info === 0) {
          goNext()
        }
      } catch { }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [goNext])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button className="popup__close" onClick={onClose}>✕</button>

        {/* Prev / Next */}
        <button className="popup__nav popup__nav--prev" onClick={goPrev}>‹</button>
        <button className="popup__nav popup__nav--next" onClick={goNext}>›</button>

        {/* Video */}
        <div className="popup__video">
          <iframe
            key={current.id}
            src={popupVideoUrl}
            title={current.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Info */}
        <div className="popup__info">
          <span className="popup__cat">{current.category}</span>
          <h3 className="popup__title">{current.title}</h3>
          <p className="popup__desc">{current.desc}</p>

          {/* Dot indicators */}
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

// ── Main Home Component ──
export default function Home() {
  const [popup, setPopup] = useState(null)
  const navigate = useNavigate()
  const trackRef = useRef(null)
  const scrollRef = useRef(null)
  const isPaused = useRef(false)

  // ── Auto-scroll portfolio ──
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const CARD_WIDTH = 312
    const TOTAL = portfolioItems.length * CARD_WIDTH
    let pos = TOTAL
    track.style.transition = 'none'
    track.scrollLeft = pos
    const scroll = () => {
      if (isPaused.current) { scrollRef.current = requestAnimationFrame(scroll); return }
      pos += 0.6
      if (pos >= TOTAL * 2) { pos = TOTAL; track.style.transition = 'none'; track.scrollLeft = pos }
      else { track.scrollLeft = pos }
      scrollRef.current = requestAnimationFrame(scroll)
    }
    scrollRef.current = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(scrollRef.current)
  }, [])


  const [scrollProgress, setScrollProgress] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(window.scrollY / totalScroll)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const pauseScroll = () => { isPaused.current = true }
  const resumeScroll = () => { isPaused.current = false }

  return (
    <div className="home">

      {/* ===== 3D BACKGROUND CANVAS ===== */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hero__text-wrapper"
          >
            <h1 className="hero__title">
              CREATIVE<br />
              <span className="text-gradient">DIGITAL</span><br />
              AGENCY
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="hero__cta">
        <button className="btn btn--outline" onClick={() => navigate('/work')}>View Portfolio</button>
        <button className="btn btn--gold" onClick={() => navigate('/contact')}>Start a Project</button>
      </div>

      {/* ===== WHO WE ARE ===== */}
      <section className="about" onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>
        <div className="about__text">
          <h2 className="about__title">Who We Are</h2>
          <p className="about__body">
            <strong>Pulse Digital Creations</strong> is a creative agency helping
            brands grow through <strong>branding</strong>, reels production,
            and <strong>digital marketing</strong>.
          </p>
          <p className="about__body">
            We create modern visual content that builds{' '}
            <strong>powerful brand identity</strong>.
          </p>
          <span className="about__link">Learn more about us →</span>
        </div>
        <div className="about__image">
          <svg viewBox="0 0 420 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="420" height="280" rx="6" fill="#1a1008" />
            <rect x="70" y="50" width="280" height="180" rx="10" fill="#0d0d0d" stroke="#3a2a10" strokeWidth="1.5" />
            <circle cx="210" cy="145" r="58" fill="#0a0a0a" stroke="#4a3a18" strokeWidth="2" />
            <circle cx="210" cy="145" r="38" fill="#111" stroke="#5a4a28" strokeWidth="1.5" />
            <circle cx="210" cy="145" r="20" fill="#0d0d0d" stroke="#6a5a38" strokeWidth="1" />
            <circle cx="210" cy="145" r="8" fill="#1a1a1a" />
            <rect x="120" y="64" width="180" height="36" rx="5" fill="#111" stroke="#2a1a08" strokeWidth="1" />
            <rect x="310" y="74" width="28" height="18" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
            <circle cx="96" cy="82" r="9" fill="#c8700a" opacity="0.75" />
          </svg>
        </div>
      </section>

      {/* ===== SCROLL SHOWCASE (Oden.be style) ===== */}
      <ScrollShowcase />

      {/* ===== PORTFOLIO — Auto-scroll with hover video ===== */}
      <section className="portfolio">
        <p className="section-label">Our Portfolio</p>
        <h2 className="section-heading">Featured Work</h2>
        <p className="portfolio__hint">Hover to preview · Click to watch full video</p>

        <div
          className="portfolio__track"
          ref={trackRef}
          onMouseEnter={pauseScroll}
          onMouseLeave={resumeScroll}
          onTouchStart={pauseScroll}
          onTouchEnd={resumeScroll}
        >
          {loopedItems.map((item, idx) => (
            <PortfolioCard
              key={`${item.id}-${idx}`}
              item={item}
              onClick={() => setPopup(item)}
            />
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services-section">
        <p className="section-label">What We Do</p>
        <p className="section-heading-text">Our Services</p>
        <div className="services-grid">
          {[
            { title: 'Reels\nProduction', color: 'black', icon: '🎬' },
            { title: 'Branding &\nLogo Design', color: 'red', icon: '🎨' },
            { title: 'Motion\nGraphics', color: 'blue', icon: '✦' },
          ].map((s) => (
            <div
              key={s.title}
              className={`svc-tile svc-tile--${s.color}`}
              onClick={() => navigate('/services')}
            >
              <span className="svc-tile__icon">{s.icon}</span>
              <span className="svc-tile__label">{s.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GET IN TOUCH ===== */}
      <section className="contact-strip">
        <p className="section-heading-text">Get In Touch</p>
        <div className="contact-strip__inner">
          <div className="contact-strip__info">
            <div className="contact-strip__row"><span>📞</span><span>9438556276</span></div>
            <div className="contact-strip__row"><span>✉</span><span>pulsedigitalcreations</span></div>
          </div>
          <button className="btn btn--gold btn--lg" onClick={() => navigate('/contact')}>
            Start a Project
          </button>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 Pulse Digital Creations. All rights reserved.</p>
      </footer>

      {/* ===== VIDEO POPUP ===== */}
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
