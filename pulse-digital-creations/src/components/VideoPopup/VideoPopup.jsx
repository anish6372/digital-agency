import { useState, useEffect, useCallback } from 'react'

export default function VideoPopup({ item, items, onClose }) {
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
          <video
            key={current.id}
            src={current.videoSrc}
            controls
            autoPlay
            onEnded={goNext}
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
