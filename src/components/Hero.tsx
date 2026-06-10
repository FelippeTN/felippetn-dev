import { useMemo } from 'react'
import felippeImg from '../assets/felippetn-computador.png'

const GitHubIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
)

const LinkedInIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
)

const ArrowIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Hero() {
  // Posições fixas por render — partículas sutis no fundo
  const stars = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 100}%`,
        delay: `${(Math.random() * 4).toFixed(2)}s`,
      })),
    [],
  )

  return (
    <section className="hero" id="top">
      <div className="hero__stars" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className="hero__star"
            style={{ top: s.top, left: s.left, '--d': s.delay } as React.CSSProperties}
          />
        ))}
      </div>

      <span className="hero__watermark" aria-hidden="true">
        FELIPPE
      </span>

      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__photo" aria-hidden="true">
        <img src={felippeImg} alt="" draggable={false} />
      </div>

      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__name label">Felippe Toscano Nalim</p>

          <h1 className="hero__title display">
            <span className="line">
              <span style={{ '--d': '0.6s' } as React.CSSProperties}>Engenheiro</span>
            </span>
            <span className="line">
              <span style={{ '--d': '0.72s' } as React.CSSProperties}>de</span>
            </span>
            <span className="line line--accent">
              <span style={{ '--d': '0.84s' } as React.CSSProperties}>Software</span>
            </span>
          </h1>

          <div className="hero__meta">
            <a href="#projetos" className="hero__cta">
              Ver projetos {ArrowIcon}
            </a>
            <div className="hero__socials">
              <a
                href="https://github.com/FelippeTN"
                target="_blank"
                rel="noreferrer"
                className="icon-btn"
                aria-label="GitHub"
              >
                {GitHubIcon}
              </a>
              <a
                href="https://www.linkedin.com/in/felippe-toscano-nalim"
                target="_blank"
                rel="noreferrer"
                className="icon-btn"
                aria-label="LinkedIn"
              >
                {LinkedInIcon}
              </a>
            </div>
          </div>
        </div>
      </div>

      <span className="hero__coords">Brasil — UTC-3</span>
      <span className="hero__scroll">Scroll</span>
    </section>
  )
}
