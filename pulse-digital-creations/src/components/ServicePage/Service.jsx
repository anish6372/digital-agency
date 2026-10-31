import { useNavigate } from 'react-router-dom'
import { services } from '../../data/services'
import './Service.scss'

export default function Services() {
  const navigate = useNavigate()

  return (
    <div className="services-page">

      {/* HEADER */}
      <section className="page-hero">
        <p className="page-hero__label">What We Offer</p>
        <h1 className="page-hero__title">Our Services</h1>
        <p className="page-hero__sub">
          End-to-end creative solutions for brands that want to stand out.
        </p>
      </section>

      {/* LIST */}
      <section className="services-page__list">
        {services.map((s, i) => (
          <div key={s.title} className="srv-row">
            <span className="srv-row__num">{String(i + 1).padStart(2, '0')}</span>
            <div className="srv-row__main">
              <h3 className="srv-row__title">{s.title}</h3>
              <p className="srv-row__desc">{s.desc}</p>
            </div>
            <ul className="srv-row__tags">
              {s.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="services-page__cta">
        <h2>Ready to Start?</h2>
        <p>Let's bring your brand vision to life. Reach out and let's talk.</p>
        <button className="btn btn--gold btn--lg" onClick={() => navigate('/contact')}>
          Start a Project
        </button>
      </section>

    </div>
  )
}
