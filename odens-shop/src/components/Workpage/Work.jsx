import './Work.scss'

export default function Work() {
  return (
    <div className="work-page">
      <div className="work-page__header">
        <p className="work-page__label">Our Portfolio</p>
        <h1 className="work-page__title">Our Work</h1>
        <p className="work-page__sub">A selection of projects we're proud of.</p>
      </div>
      <div className="work-page__grid">
        {['Cafe Reel', 'Brand Logo — Chromed', 'Cinema FX', 'Elixir Brand', 'Product Reel', 'Horizon Identity'].map((title, i) => (
          <div key={i} className="work-card">
            <div className="work-card__img" style={{ background: `hsl(${i * 40 + 10}, 60%, 8%)` }}>
              <span className="work-card__play">▶</span>
            </div>
            <p className="work-card__title">{title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
