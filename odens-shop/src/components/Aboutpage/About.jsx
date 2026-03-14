import { useNavigate } from 'react-router-dom'
import './About.scss'

const team = [
  { name: 'Ramkrushna Panda', role: 'Founder & Brand Strategist', emoji: '🎯' },
  { name: 'Gopal Krushna Panda', role: 'Motion Graphics Artist', emoji: '✦' },
  { name: 'Disha Padhi', role: 'Content Producer', emoji: '📸' },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="about-page">

      {/* ===== HEADER ===== */}
      <div className="about-page__header">
        <p className="about-page__label">Our Story</p>
        <h1 className="about-page__title">Who We Are</h1>
        <p className="about-page__sub">
          A passionate team of creators, storytellers, and brand builders.
        </p>
      </div>

      {/* ===== STORY ===== */}
      <section className="about-story">
        <div className="about-story__text">
          <h2>Pulse Digital Creations</h2>
          <p>
            <strong>Pulse Digital Creations</strong> is a creative agency helping
            brands grow through <strong>branding</strong>, reels production,
            and <strong>digital marketing</strong>.
          </p>
          <p>
            We create modern visual content that builds{' '}
            <strong>powerful brand identity</strong>. From cinematic cafe reels
            to complete brand systems, every project is crafted with intention.
          </p>
          <p>
            Founded with a mission to make high-quality creative production
            accessible to businesses of all sizes — we combine strategy,
            aesthetics, and storytelling to deliver work that resonates.
          </p>
        </div>
        <div className="about-story__visual">
          <svg viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="420" height="300" rx="8" fill="#1a1008" />
            <rect x="60" y="50" width="300" height="200" rx="10" fill="#0d0d0d" stroke="#3a2a10" strokeWidth="1.5" />
            <circle cx="210" cy="155" r="65" fill="#0a0a0a" stroke="#4a3a18" strokeWidth="2" />
            <circle cx="210" cy="155" r="44" fill="#111" stroke="#5a4a28" strokeWidth="1.5" />
            <circle cx="210" cy="155" r="24" fill="#0d0d0d" stroke="#6a5a38" strokeWidth="1" />
            <circle cx="210" cy="155" r="10" fill="#1a1a1a" />
            <rect x="120" y="66" width="180" height="38" rx="5" fill="#111" stroke="#2a1a08" strokeWidth="1" />
            <rect x="318" y="76" width="28" height="18" rx="3" fill="#1a1a1a" />
            <circle cx="88" cy="88" r="9" fill="#c8700a" opacity="0.8" />
          </svg>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="about-values">
        <p className="about-values__label">What Drives Us</p>
        <h2 className="about-values__heading">Our Values</h2>
        <div className="about-values__grid">
          {[
            { icon: '🎯', title: 'Intentional Design', desc: 'Every frame, every colour, every word is deliberate. We don\'t do average.' },
            { icon: '🤝', title: 'Brand Partnership', desc: 'We treat your brand like our own. Your success is our success.' },
            { icon: '⚡', title: 'Fast Turnaround', desc: 'Quality work delivered quickly. We respect your timelines.' },
            { icon: '📈', title: 'Results Driven', desc: 'Beautiful work that actually moves the needle for your business.' },
          ].map((v) => (
            <div key={v.title} className="value-card">
              <span className="value-card__icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="about-team">
        <p className="about-team__label">The People</p>
        <h2 className="about-team__heading">Meet the Team</h2>
        <div className="about-team__grid">
          {team.map((m) => (
            <div key={m.name} className="team-card">
              <div className="team-card__avatar">{m.emoji}</div>
              <h3 className="team-card__name">{m.name}</h3>
              <p className="team-card__role">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <div className="about-cta">
        <h2>Ready to Work Together?</h2>
        <p>Let's build something great for your brand.</p>
        <div className="about-cta__btns">
          <button className="btn btn--gold btn--lg" onClick={() => navigate('/contact')}>Start a Project</button>
          <button className="btn btn--outline" onClick={() => navigate('/services')}>View Services</button>
        </div>
      </div>

    </div>
  )
}
