import { useNavigate } from 'react-router-dom'
import './Service.scss'

const services = [
  {
    icon: '🎬',
    title: 'Reels Production',
    desc: 'We craft high-impact short-form videos that stop the scroll. From cafe ambiance reels to product showcases, every frame is intentional.',
    items: ['Cafe reels', 'Product videos', 'Event coverage', 'Instagram & YouTube Shorts'],
    color: 'orange',
  },
  {
    icon: '🎨',
    title: 'Branding & Logo Design',
    desc: 'Your brand is more than a logo — it\'s a feeling. We build complete brand identities that resonate with your audience and stand the test of time.',
    items: ['Logo creation', 'Brand identity', 'Color & typography systems', 'Brand guidelines'],
    color: 'gold',
  },
  {
    icon: '✦',
    title: 'Motion Graphics',
    desc: 'Bring your brand to life with stunning animations. From logo reveals to full promotional videos, we make motion work for your message.',
    items: ['Logo animation', 'Promotional videos', 'Social media animations', 'Title sequences'],
    color: 'blue',
  },
  {
    icon: '📱',
    title: 'Digital Marketing',
    desc: 'Strategy meets creativity. We build and execute digital campaigns that grow your reach, engage your audience, and convert browsers into buyers.',
    items: ['Social media strategy', 'Content planning', 'Ad creatives', 'Campaign management'],
    color: 'purple',
  },
  {
    icon: '📸',
    title: 'Product Photography',
    desc: 'Make your products irresistible. Clean, professional product photography that elevates your brand and drives sales.',
    items: ['Product shoots', 'Lifestyle photography', 'Catalogue shoots', 'E-commerce ready edits'],
    color: 'green',
  },
  {
    icon: '🖥',
    title: 'Web Design',
    desc: 'Beautiful, functional websites that convert. We design and build modern digital experiences tailored to your brand\'s personality.',
    items: ['Landing pages', 'Portfolio sites', 'E-commerce design', 'UI/UX consulting'],
    color: 'teal',
  },
]

export default function Services() {
  const navigate = useNavigate()

  return (
    <div className="services-page">

      {/* HEADER */}
      <div className="services-page__header">
        <p className="services-page__label">What We Offer</p>
        <h1 className="services-page__title">Our Services</h1>
        <p className="services-page__sub">
          End-to-end creative solutions for brands that want to stand out.
        </p>
      </div>

      {/* GRID */}
      <div className="services-page__grid">
        {services.map((s) => (
          <div key={s.title} className={`srv-card srv-card--${s.color}`}>
            <div className="srv-card__icon">{s.icon}</div>
            <h3 className="srv-card__title">{s.title}</h3>
            <p className="srv-card__desc">{s.desc}</p>
            <ul className="srv-card__list">
              {s.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="services-page__cta">
        <h2>Ready to Start?</h2>
        <p>Let's bring your brand vision to life. Reach out and let's talk.</p>
        <button className="btn btn--gold btn--lg" onClick={() => navigate('/contact')}>
          Start a Project
        </button>
      </div>

    </div>
  )
}
