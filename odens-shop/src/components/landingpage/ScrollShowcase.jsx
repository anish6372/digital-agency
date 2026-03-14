import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollShowcase.scss'

gsap.registerPlugin(ScrollTrigger)

const slides = [
    {
        id: 0,
        label: 'Reels Production',
        title: 'Cinematic\nStorytelling',
        sub: 'We craft short-form reels that stop thumbs and start conversations — from cafe atmospheres to product close-ups.',
        accent: '#e85d04',
        bg: '#080400',
        visual: 'reels',
    },
    {
        id: 1,
        label: 'Branding & Identity',
        title: 'Brands That\nLeave a Mark',
        sub: 'Bold logos, cohesive identities, and design systems built for brands ready to stand out in crowded markets.',
        accent: '#e91e8c',
        bg: '#0a0010',
        visual: 'brand',
    },
    {
        id: 2,
        label: 'Motion Graphics',
        title: 'Where Design\nMoves You',
        sub: 'High-impact animated sequences for product launches, social content, and digital campaigns.',
        accent: '#1a3fff',
        bg: '#000a20',
        visual: 'motion',
    },
    {
        id: 3,
        label: 'Digital Marketing',
        title: 'Grow Beyond\nBoundaries',
        sub: 'Strategy-led campaigns that pair stunning creative with data-driven targeting to maximise every rupee.',
        accent: '#ffd100',
        bg: '#0a0800',
        visual: 'marketing',
    },
]

function ReelsVisual({ accent }) {
    return (
        <svg viewBox="0 0 480 320" fill="none" className="showcase__svg">
            <rect width="480" height="320" rx="12" fill="#0d0400" />
            <circle cx="240" cy="155" r="100" fill="none" stroke={accent} strokeWidth="2" opacity="0.2" />
            <circle cx="240" cy="155" r="66" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.45" />
            <circle cx="240" cy="155" r="30" fill={accent} opacity="0.12" />
            {[0, 60, 120, 180, 240, 300].map(deg => {
                const r = 66, rad = (deg * Math.PI) / 180
                return <circle key={deg} cx={240 + r * Math.cos(rad)} cy={155 + r * Math.sin(rad)} r="10" fill={accent} opacity="0.7" />
            })}
            <polygon points="225,135 225,177 270,156" fill="white" opacity="0.95" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <rect key={i} x={84 + i * 40} y="275" width="28" height="18" rx="3" fill={accent} opacity="0.18" />
            ))}
            <text x="240" y="44" textAnchor="middle" fill={accent} fontSize="10" letterSpacing="5" fontFamily="monospace">REELS PRODUCTION</text>
        </svg>
    )
}

function BrandVisual({ accent }) {
    return (
        <svg viewBox="0 0 480 320" fill="none" className="showcase__svg">
            <rect width="480" height="320" rx="12" fill="#0a0010" />
            <circle cx="240" cy="145" r="90" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.25" />
            <circle cx="240" cy="145" r="56" fill="none" stroke={accent} strokeWidth="2" opacity="0.55" />
            <circle cx="240" cy="145" r="22" fill={accent} opacity="0.2" />
            <line x1="60" y1="145" x2="420" y2="145" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x="240" y="151" textAnchor="middle" fill="white" fontSize="24" fontWeight="800" letterSpacing="7" fontFamily="serif">PULSE</text>
            <text x="240" y="172" textAnchor="middle" fill={accent} fontSize="9" letterSpacing="5">DIGITAL CREATIONS</text>
            <rect x="58" y="58" width="62" height="62" fill="none" stroke={accent} strokeWidth="1" opacity="0.25" />
            <rect x="360" y="198" width="62" height="62" fill="none" stroke={accent} strokeWidth="1" opacity="0.25" />
            {/* Elixir / Chromed brand references */}
            <text x="240" y="272" textAnchor="middle" fill={accent} fontSize="10" letterSpacing="5">BRANDING & IDENTITY</text>
        </svg>
    )
}

function MotionVisual({ accent }) {
    return (
        <svg viewBox="0 0 480 320" fill="none" className="showcase__svg">
            <rect width="480" height="320" rx="12" fill="#000a20" />
            {[0, 1, 2, 3].map(i => (
                <path key={i}
                    d={`M0,${160 + i * 20} C80,${128 + i * 20} 160,${192 + i * 20} 240,${160 + i * 20} S400,${128 + i * 20} 480,${160 + i * 20}`}
                    stroke={accent} strokeWidth={2 - i * 0.35} opacity={0.65 - i * 0.1} fill="none" />
            ))}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
                const rad = (angle * Math.PI) / 180
                return <line key={angle} x1="240" y1="160" x2={240 + 58 * Math.cos(rad)} y2={160 + 58 * Math.sin(rad)} stroke={accent} strokeWidth="1.5" opacity="0.45" />
            })}
            <circle cx="240" cy="160" r="14" fill={accent} opacity="0.9" />
            <text x="240" y="38" textAnchor="middle" fill={accent} fontSize="10" letterSpacing="5">MOTION GRAPHICS</text>
        </svg>
    )
}

function MarketingVisual({ accent }) {
    const barHeights = [40, 75, 110, 145, 180]
    const xs = [100, 160, 220, 280, 340]
    return (
        <svg viewBox="0 0 480 320" fill="none" className="showcase__svg">
            <rect width="480" height="320" rx="12" fill="#0a0800" />
            {barHeights.map((h, i) => (
                <rect key={i} x={xs[i]} y={245 - h} width="40" height={h} rx="4" fill={accent} opacity={0.18 + i * 0.14} />
            ))}
            <polyline points="120,205 180,170 240,135 300,100 360,65" stroke={accent} strokeWidth="2.5" fill="none" opacity="0.9" />
            {xs.map((x, i) => (
                <circle key={x} cx={x + 20} cy={[205, 170, 135, 100, 65][i]} r="5" fill={accent} />
            ))}
            <line x1="80" y1="245" x2="400" y2="245" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="240" y="285" textAnchor="middle" fill={accent} fontSize="10" letterSpacing="5">DIGITAL MARKETING</text>
        </svg>
    )
}

function Visual({ type, accent }) {
    if (type === 'reels') return <ReelsVisual accent={accent} />
    if (type === 'brand') return <BrandVisual accent={accent} />
    if (type === 'motion') return <MotionVisual accent={accent} />
    return <MarketingVisual accent={accent} />
}

export default function ScrollShowcase() {
    const wrapperRef = useRef(null)
    const panelRef = useRef(null)
    const textRefs = useRef([])
    const visualRefs = useRef([])
    const dotRefs = useRef([])
    const activeRef = useRef(-1)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const TOTAL = slides.length

            // All slides start hidden — CSS already sets opacity:0/visibility:hidden
            // No need for redundant gsap.set here

            slides.forEach((slide, i) => {
                const fraction = i / TOTAL
                const nextFraction = (i + 1) / TOTAL

                // Slide 0 starts when wrapper is 90% into viewport (before sticky kicks in)
                // Other slides start at their scroll fraction
                const startOffset = i === 0
                    ? 'top 90%'
                    : () => `top+=${fraction * (wrapperRef.current.offsetHeight - window.innerHeight)} top`

                const endOffset = i === 0
                    ? () => `top+=${nextFraction * (wrapperRef.current.offsetHeight - window.innerHeight)} top`
                    : () => `top+=${nextFraction * (wrapperRef.current.offsetHeight - window.innerHeight)} top`

                ScrollTrigger.create({
                    trigger: wrapperRef.current,
                    start: startOffset,
                    end: endOffset,
                    onEnter: () => activateSlide(i),
                    onEnterBack: () => activateSlide(i),
                })
            })
        }, wrapperRef)

        return () => ctx.revert()
    }, [])

    function activateSlide(index) {
        const prev = activeRef.current
        if (prev === index) return  // already active, skip re-animation
        activeRef.current = index

        // Animate out previous
        if (prev >= 0) {
            const dir = index > prev ? -1 : 1 // -1 = slides going up (exit up), 1 = exit down
            const tEl = textRefs.current[prev]
            const vEl = visualRefs.current[prev]
            if (tEl) gsap.to(tEl, { autoAlpha: 0, y: dir * -40, duration: 0.45, ease: 'power2.in' })
            if (vEl) gsap.to(vEl, { autoAlpha: 0, y: dir * -40, scale: 0.96, duration: 0.45, ease: 'power2.in' })
            if (dotRefs.current[prev]) dotRefs.current[prev].classList.remove('active')
        }

        // Animate in new
        const slide = slides[index]
        const inDir = prev >= 0 ? (index > prev ? 1 : -1) : 0 // come from below (1) or above (-1)
        const tEl = textRefs.current[index]
        const vEl = visualRefs.current[index]
        if (tEl) {
            gsap.fromTo(tEl, { autoAlpha: 0, y: inDir * 50 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 })
        }
        if (vEl) {
            gsap.fromTo(vEl, { autoAlpha: 0, y: inDir * 60, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out', delay: 0.05 })
        }
        if (dotRefs.current[index]) dotRefs.current[index].classList.add('active')

        // Update panel accent and bg
        if (panelRef.current) {
            panelRef.current.style.setProperty('--accent', slide.accent)
            panelRef.current.style.background = slide.bg
        }
    }

    return (
        <div className="showcase-wrapper" ref={wrapperRef}>
            <div className="showcase-panel" ref={panelRef}>

                {/* LEFT — text */}
                <div className="showcase-panel__left">
                    <p className="showcase-panel__eyebrow">What We Create</p>

                    {slides.map((slide, i) => (
                        <div
                            key={slide.id}
                            className="showcase-slide"
                            ref={el => textRefs.current[i] = el}
                            style={{ '--slide-accent': slide.accent }}
                        >
                            <span className="showcase-slide__label">{slide.label}</span>
                            <h2 className="showcase-slide__title">{slide.title}</h2>
                            <p className="showcase-slide__sub">{slide.sub}</p>
                        </div>
                    ))}

                    {/* Progress dots */}
                    <div className="showcase-dots">
                        {slides.map((_, i) => (
                            <span
                                key={i}
                                className="showcase-dot"
                                ref={el => dotRefs.current[i] = el}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT — visuals */}
                <div className="showcase-panel__right">
                    {slides.map((slide, i) => (
                        <div
                            key={slide.id}
                            className="showcase-visual"
                            ref={el => visualRefs.current[i] = el}
                        >
                            <Visual type={slide.visual} accent={slide.accent} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
