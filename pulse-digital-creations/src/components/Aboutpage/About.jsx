import './About.scss'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()
  return (
    <div className="about-page">
      {/* HEADER */}
      <section className="page-hero">
        <div>
          <p className="page-hero__label">Our Story</p>
          <h1 className="page-hero__title">Pulse Digital Creations</h1>
          <p className="page-hero__sub">
            A collective of creative minds dedicated to pushing the boundaries of digital storytelling.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="container">
          <div className="about-story__grid">
            <motion.div 
              className="about-story__text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2>The Heartbeat of Innovation</h2>
              <p>
                Founded with a vision to revolutionize how brands connect with their audience, 
                <strong> Pulse Digital Creations</strong> is more than just an agency. We are your 
                strategic partners in the digital landscape.
              </p>
              <p>
                We specialize in high-impact <strong>reels production</strong>, 
                <strong>brand identity</strong>, and <strong>motion graphics</strong> that don't just 
                look good — they drive real business results. Our approach is rooted in 
                the belief that every brand has a unique pulse that deserves to be heard.
              </p>
            </motion.div>
            <motion.div 
              className="about-story__visual"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="pulse-circle">
                <div className="pulse-ring"></div>
                <div className="pulse-ring"></div>
                <div className="pulse-ring"></div>
                <span>P</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="container">
          <p className="about-values__label">Core Principles</p>
          <h2 className="about-values__heading">What Drives Us</h2>
          <div className="about-values__grid">
            {[
              { icon: '🎯', title: 'Precision', desc: 'Every pixel, frame, and strategy is crafted with intentionality.' },
              { icon: '⚡', title: 'Momentum', desc: 'We move fast, iterate constantly, and keep your brand ahead.' },
              { icon: '👁', title: 'Vision', desc: 'Looking beyond trends to build timeless digital experiences.' },
              { icon: '🤝', title: 'Partnership', desc: 'Your growth is our engine. We win when you win.' },
            ].map((v, i) => (
              <div key={i} className="value-card">
                <span className="value-card__icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM (Optional/Placeholder) */}
      <section className="about-team">
        <div className="container">
          <img className="about-team__image" src="/core-team.jpg" alt="Meet the core team: Ramkrushna Panda, Sanak Padhi and Tanish Kumawat" />
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to find your pulse?</h2>
          <p>Let's collaborate and build something that resonates.</p>
          <div className="about-cta__btns">
            <button className="btn btn--outline btn--lg" onClick={() => navigate("/contact")}>Start a Project</button>
            <button className="btn btn--outline btn--lg" onClick={() => navigate("/work")}>View Our Work</button>
          </div>
        </div>
      </section>
    </div>
  )
}
