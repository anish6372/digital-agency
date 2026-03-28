import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene from './PulseBackground'
import ScrollShowcase from './ScrollShowcase'
import './PulseLanding.scss'

// Import Hero Image
import pulseHero from '../../assets/pulse_hero.png'

gsap.registerPlugin(ScrollTrigger)

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

const loopedItems = [...portfolioItems, ...portfolioItems, ...portfolioItems]

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

function PortfolioCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false)
  const hoverTimer = useRef(null)

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => setHovered(true), 400)
  }

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current)
    setHovered(false)
  }

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
        <div className={`portfolio-card__svg ${hovered ? 'portfolio-card__svg--hidden' : ''}`}>
          <ThumbSVG type={item.thumb} />
        </div>

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
        <span className="portfolio-card__cat">{item.category}</span>
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

  const popupVideoUrl = current.videoUrl
    + '?autoplay=1&rel=0&modestbranding=1&enablejsapi=1'

  useEffect(() => {
    const handler = (e) => {
      try {
        const data = JSON.parse(e.data)
        if (data.event === 'onStateChange' && data.info === 0) {
          goNext()
        }
      } catch { }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [goNext])

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
          <iframe
            key={current.id}
            src={popupVideoUrl}
            title={current.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
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
  const trackRef = useRef(null)
  const scrollRef = useRef(null)
  const isPaused = useRef(false)

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

  const SECTION_COLORS = [
    '#ff0000', // Hero - Pulse Red
    '#e91e8c', // Branding - pink
    '#1a3fff', // Motion - blue
    '#ffd100', // Marketing - gold
  ]

  const getColor = (progress) => {
    const colorIdx = Math.min(Math.floor(progress * SECTION_COLORS.length), SECTION_COLORS.length - 1)
    return SECTION_COLORS[colorIdx]
  }

  const currentColor = getColor(scrollProgress)

  return (
    <div className="pulse-landing">


      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      <section className="hero">
        <div className="hero__asset-wrapper">
          <img src={pulseHero} alt="Pulse Digital Creations" className="hero__asset" />
        </div>
        <div className="hero__content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hero__text-wrapper"
          >
            <h1 className="hero__title">
              ELEVATE YOUR<br />
              <span className="text-gradient">DIGITAL PULSE</span>
            </h1>
            <p className="hero__subtitle">
              We create high-impact visual stories that command attention and drive results.
            </p>
          </motion.div>
          <div className="hero__cta">
            <button className="btn btn--gold btn--lg" onClick={() => navigate('/contact')}>Start a Project</button>
            <button className="btn btn--outline" onClick={() => navigate('/work')}>Portfolio</button>
          </div>
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
          <p className="portfolio__hint">Hover to preview full cinematic experiences</p>
        </div>

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
                <span>📞 9438556276</span>
                <span>✉ pulse.digital</span>
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
