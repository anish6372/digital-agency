import './Work.scss'
import { motion } from 'framer-motion'

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

export default function Work() {
  return (
    <div className="work-page">
      <div className="container">
        <div className="work-page__header">
          <p className="section-label">Our Portfolio</p>
          <h1 className="section-title">Case Studies</h1>
          <p className="work-page__sub">
            A curated selection of our most recent and impactful creative collaborations.
          </p>
        </div>

        <div className="work-grid">
          {projects.map((p, i) => (
            <motion.div 
              key={p.title} 
              className="work-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="work-card__img" style={{ background: p.color }}>
                <div className="work-card__overlay">
                   <span>View Case Study →</span>
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
         <button className="btn btn--gold btn--lg">Get in Touch</button>
      </section>
    </div>
  )
}
