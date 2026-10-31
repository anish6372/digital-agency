import { useState } from 'react'
import './Work.scss'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { portfolioItems } from '../../data/portfolio'
import VideoPopup from '../VideoPopup/VideoPopup'

const projects = [
  {
    title: 'Cafe Reel',
    category: 'Video Production',
    desc: 'Cinematic brand story for a specialty coffee house.',
    color: 'hsl(20, 60%, 8%)'
  },
  {
    title: 'Chromed Identity',
    category: 'Branding',
    desc: 'Complete visual identity and logo system.',
    color: 'hsl(40, 60%, 8%)'
  },
  {
    title: 'Cinema FX',
    category: 'Motion Graphics',
    desc: 'High-impact motion graphics for film.',
    color: 'hsl(10, 60%, 8%)'
  },
  {
     title: 'Elixir Brand',
     category: 'Branding',
     desc: 'Premium packaging and brand strategy.',
     color: 'hsl(200, 40%, 8%)'
  },
  {
     title: 'Product Reel',
     category: 'Production',
     desc: 'Dynamic product showcase for e-commerce.',
     color: 'hsl(280, 40%, 8%)'
  },
  {
     title: 'Horizon App',
     category: 'UI/UX Design',
     desc: 'Modern interface for a travel tech startup.',
     color: 'hsl(160, 40%, 8%)'
  }
]

// Reels (with video) first, then the other case studies
const allItems = [
  ...portfolioItems.map((p) => ({ ...p, key: `reel-${p.id}` })),
  ...projects.map((p) => ({ ...p, key: p.title })),
]
const categories = ['All', ...new Set(allItems.map((p) => p.category))]

function playVideo(e) {
  const v = e.currentTarget.querySelector('video')
  if (v) { v.currentTime = 0; v.play().catch(() => {}) }
}
function pauseVideo(e) {
  const v = e.currentTarget.querySelector('video')
  if (v) v.pause()
}

export default function Work() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const [popup, setPopup] = useState(null)
  const visible = filter === 'All' ? allItems : allItems.filter((p) => p.category === filter)
  const visibleReels = visible.filter((p) => p.videoSrc)

  return (
    <div className="work-page">
      <section className="page-hero">
        <p className="page-hero__label">Our Portfolio</p>
        <h1 className="page-hero__title">Case Studies</h1>
        <p className="page-hero__sub">
          A curated selection of our most recent and impactful creative collaborations.
        </p>
      </section>

      <div className="container">
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

        <div className="work-grid">
          {visible.map((p, i) => (
            <motion.div
              layout
              key={p.key}
              className={`work-card ${p.videoSrc ? 'work-card--reel' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
              onMouseEnter={p.videoSrc ? playVideo : undefined}
              onMouseLeave={p.videoSrc ? pauseVideo : undefined}
              onClick={p.videoSrc ? () => setPopup(p) : undefined}
            >
              <div className="work-card__img" style={p.videoSrc ? undefined : { background: p.color }}>
                {p.videoSrc && <video src={p.videoSrc} muted loop playsInline preload="metadata" />}
                <div className="work-card__overlay">
                  <span>{p.videoSrc ? 'Watch Reel ▶' : 'View Case Study →'}</span>
                </div>
              </div>
              <div className="work-card__content">
                <span className="work-card__cat">{p.category}</span>
                <h3 className="work-card__title">{p.title}</h3>
                <p className="work-card__desc">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="work-footer">
        <h2>Want to see more?</h2>
        <p>We've worked with over 50+ brands globally. Let's talk about yours.</p>
        <button className="btn btn--gold btn--lg" onClick={() => navigate('/contact')}>Get in Touch</button>
      </section>

      {popup && (
        <VideoPopup item={popup} items={visibleReels} onClose={() => setPopup(null)} />
      )}
    </div>
  )
}
