import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { services } from '../../data/services'
import { portfolioItems } from '../../data/portfolio'
import VideoPopup from '../VideoPopup/VideoPopup'
import './PulseLanding.scss'
import './Polish.scss'

function PortfolioCard({ item, index, onClick }) {
  const videoRef = useRef(null)

  const play = () => {
    const v = videoRef.current
    if (v) { v.currentTime = 0; v.play().catch(() => {}) }
  }
  const stop = () => {
    const v = videoRef.current
    if (v) v.pause()
  }

  return (
    <div className="project-card" onMouseEnter={play} onMouseLeave={stop} onClick={onClick}>
      <div className="project-card__image">
        <video ref={videoRef} src={item.videoSrc} muted loop playsInline preload="metadata" />
        <span className="project-card__play" aria-hidden="true">▶</span>
        <div className="project-card__overlay">
          <span className="project-card__client">{String(index + 1).padStart(2, '0')} — {item.category}</span>
          <h3 className="project-card__title">{item.title}<span className="project-card__arrow">↗</span></h3>
        </div>
      </div>
    </div>
  )
}

const categories = ['All', ...new Set(portfolioItems.map((p) => p.category))]

const marqueeItems = ['Reels Production', 'Branding', 'Motion Graphics', 'Digital Marketing', 'Product Photography', 'Web Design']

export default function PulseLanding() {
  const [popup, setPopup] = useState(null)
  const [filter, setFilter] = useState('All')
  const visibleItems = filter === 'All' ? portfolioItems : portfolioItems.filter((p) => p.category === filter)
  const [openService, setOpenService] = useState(0)
  const navigate = useNavigate()

  return (
    <div className="pulse-landing">

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-background">
          <span className="hero-glow hero-glow--one" />
          <span className="hero-glow hero-glow--two" />
          <video src="/videos/my-ca-4.mp4" autoPlay muted loop playsInline />
        </div>
        <div className="hero-content">
          <h1 className="hero-tagline">
            Elevate your<br />digital pulse
          </h1>
          <div className="hero-aside">
            <span className="hero-aside__accent" />
            <p className="hero-subtitle">Modern Digital Agency</p>
            <p className="hero-desc">
              We create high-impact visual stories that command attention and drive results.
            </p>
            <button className="btn-hero-cta" onClick={() => navigate('/contact')}>
              Start a Project <span className="btn-hero-cta__arrow">›</span>
            </button>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true"><span /></div>
      </section>

      {/* INTRO */}
      <section className="intro-section">
        <p className="section-label">Innovative Agency</p>
        <div className="intro-section__badges">
          {['Reels Production', 'Branding', 'Motion Graphics', 'Digital Marketing'].map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <section className="services-section">
        <div className="services-header">
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Fueling Modern Brands</h2>
          <p className="services-subtitle">
            Cinematic shorts that capture attention. Holistic visual systems that stand out. Dynamic
            visuals that tell your story.
          </p>
        </div>

        <div className="services-accordion">
          {services.map((s, i) => (
            <div key={s.title} className={`service-item ${openService === i ? 'service-item--active' : ''}`}>
              <button
                className="service-item-header"
                onClick={() => setOpenService(openService === i ? -1 : i)}
                aria-expanded={openService === i}
              >
                <span className="service-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="service-title">{s.title}</span>
                <span className="service-toggle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 12h16" />
                    <path className="service-toggle-v" d="M12 4v16" />
                  </svg>
                </span>
              </button>
              <div className="service-image-float" style={{ '--rotate': i % 2 ? '5deg' : '-5deg' }}>
                {openService === i && (
                  <video src={portfolioItems[i % portfolioItems.length].videoSrc} autoPlay muted loop playsInline />
                )}
              </div>
              <div className="service-item-body">
                <p className="service-description">{s.desc}</p>
                <ul className="service-tags">
                  {s.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-underline" onClick={() => navigate('/services')}>Explore Services</button>
      </section>

      {/* ABOUT BAND */}
      <section className="about-band" onClick={() => navigate('/about')}>
        <span className="about-band__mark" aria-hidden="true">PULSE</span>
        <h3 className="about-band__heading">We are Pulse Digital Creations</h3>
        <p className="about-band__text">
          We are a creative powerhouse specializing in brand identity, premium reels production, and
          digital strategy. Our mission is to help your brand find its unique rhythm in a crowded
          digital world.
        </p>
        <p className="about-band__result">
          <strong>Result Driven.</strong> Turning visual excellence into business growth.
        </p>
        <span className="btn-underline">Explore our story</span>
      </section>

      {/* FEATURED WORK */}
      <section className="work-section">
        <div className="work-header">
          <p className="section-label">Our Work</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="work-hint">Hover a reel to preview, click to watch in full</p>
          <div className="filter-tabs" role="tablist">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              className={`filter-tabs__tab ${filter === c ? 'filter-tabs__tab--active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        </div>

        <div className="work-grid">
          {visibleItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              className="work-grid__item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <PortfolioCard item={item} index={idx} onClick={() => setPopup(item)} />
            </motion.div>
          ))}
        </div>

        <button className="btn-underline" onClick={() => navigate('/work')}>See all projects</button>
      </section>

      {/* MARQUEE */}
      <section className="clients-section" aria-hidden="true">
        <div className="clients-marquee">
          <div className="clients-track">
            {[0, 1].map((n) => (
              <div className="clients-group" key={n}>
                {marqueeItems.map((t) => (
                  <div className="client-logo" key={t + n}>{t}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {popup && (
        <VideoPopup item={popup} items={visibleItems} onClose={() => setPopup(null)} />
      )}
    </div>
  )
}
