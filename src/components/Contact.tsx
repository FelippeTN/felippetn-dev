import { useReveal } from '../hooks/useReveal'
import { useParallax } from '../hooks/useParallax'
import { useMagnetic } from '../hooks/useMagnetic'
import { pt as siteContent } from '../content/siteContent'

const EMAIL = 'felippenalim2004@gmail.com'
const { contact } = siteContent

export default function Contact() {
  const content = useReveal<HTMLDivElement>()
  // As duas linhas do título deslizam em direções opostas durante o scroll
  const lineA = useParallax<HTMLSpanElement>(-0.07)
  const lineB = useParallax<HTMLSpanElement>(0.07)
  const mailBtn = useMagnetic<HTMLAnchorElement>(0.45)

  return (
    <section className="relative overflow-hidden py-[clamp(96px,14vh,160px)] text-center" id="contato">
      <div className="wrap reveal reveal-zoom" ref={content}>
        <span className="label-mono mb-6 block text-accent">/ 06 — Contato</span>
        <h2 className="display-type mb-8 text-[clamp(48px,9vw,140px)]">
          <span className="inline-block will-change-transform" ref={lineA}>
            Vamos
          </span>
          <br />
          <span
            className="inline-block text-transparent will-change-transform [-webkit-text-stroke:1.5px_var(--color-ink)]"
            ref={lineB}
          >
            conversar?
          </span>
        </h2>

        <p className="mx-auto mb-12 max-w-[620px] text-[clamp(15px,1.8vw,19px)] leading-[1.6] text-muted">
          {contact.description}
        </p>

        <a
          ref={mailBtn}
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-4 rounded-full border border-line-strong px-10 py-5 font-mono text-[clamp(14px,2vw,18px)] tracking-[0.02em] transition-[border-color,background-color,color,box-shadow] duration-[350ms] ease-out-expo will-change-transform hover:border-accent hover:bg-accent hover:text-bg hover:shadow-[0_16px_60px_rgba(255,90,31,0.35)]"
        >
          {EMAIL}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <div className="mt-10 flex justify-center gap-3">
          <a
            href="https://github.com/FelippeTN"
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/felippe-toscano-nalim"
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
