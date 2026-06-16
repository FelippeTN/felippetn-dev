import Starfield from './Starfield'
import { useParallax } from '../hooks/useParallax'
import { useMagnetic } from '../hooks/useMagnetic'

const felippeImg = '/felippetn-computador.png'

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

/* Labels verticais nas bordas laterais do hero */
const sideLabelClass =
  'absolute bottom-8 z-30 flex animate-rise flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted [writing-mode:vertical-rl] [animation-delay:1.4s] max-[980px]:hidden'

export default function Hero() {
  // O watermark deriva pro lado e pra cima conforme o scroll (parallax)
  const watermark = useParallax<HTMLSpanElement>(0.06, 0.18)
  const cta = useMagnetic<HTMLAnchorElement>(0.4)

  return (
    <section className="relative isolate flex min-h-svh items-end overflow-hidden max-[640px]:min-h-[92svh]" id="top">
      <Starfield />

      <span
        className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-[58%] animate-watermark-in select-none whitespace-nowrap text-[clamp(120px,21vw,400px)] font-extrabold tracking-[0.01em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)] [font-stretch:120%] max-[640px]:top-[44%] max-[640px]:text-[34vw] max-[640px]:opacity-45"
        aria-hidden="true"
      >
        <span className="block will-change-transform" ref={watermark}>
          FELIPPE
        </span>
      </span>

      <div
        className="pointer-events-none absolute bottom-0 right-0 z-30 h-[min(88vh,88svh)] w-[min(60vw,1100px)] max-[860px]:w-screen max-[860px]:opacity-35 max-[640px]:hidden"
        aria-hidden="true"
      >
        <img
          src={felippeImg}
          alt=""
          draggable={false}
          className="h-full w-full animate-photo-in object-contain object-right-bottom [filter:contrast(1.06)_saturate(0.95)]"
        />
      </div>

      <div className="relative z-20 w-full px-[clamp(20px,3vw,56px)] min-[981px]:pl-[clamp(88px,8vw,140px)]">
        <div className="relative pb-[clamp(80px,12vh,140px)] max-[640px]:pb-16">
          <p className="label-mono mb-5 flex animate-rise items-center gap-4 text-muted [animation-delay:0.5s] before:h-px before:w-12 before:bg-accent before:content-[''] max-[640px]:mb-4 max-[640px]:text-[10px] max-[640px]:tracking-[0.24em] max-[640px]:before:w-8">
            Felippe Toscano Nalim
          </p>

          <h1 className="display-type group -ml-[0.045em] whitespace-nowrap text-[clamp(44px,10.6vw,215px)] max-[640px]:text-[clamp(32px,13vw,64px)]">
            <span className="block overflow-hidden">
              <span className="block animate-line-up [animation-delay:0.6s]">Engenheiro</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block animate-line-up [animation-delay:0.72s]">de</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block animate-line-up text-transparent transition-colors duration-500 [-webkit-text-stroke:1.5px_var(--color-ink)] [animation-delay:0.84s] group-hover:text-accent group-hover:[-webkit-text-stroke:1.5px_var(--color-accent)]">
                Software
              </span>
            </span>
          </h1>

          <div className="mt-10 flex animate-rise flex-wrap items-center gap-7 [animation-delay:1.1s] max-[640px]:mt-8 max-[640px]:gap-4">
            <a
              ref={cta}
              href="#projetos"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-7 py-4 text-sm font-bold tracking-[0.02em] text-bg transition-[box-shadow,background-color] duration-300 ease-out-expo will-change-transform before:absolute before:inset-0 before:-translate-x-full before:bg-accent before:transition-transform before:duration-400 before:ease-out-expo hover:shadow-[0_12px_40px_rgba(255,90,31,0.35)] hover:before:translate-x-0 max-[420px]:w-full max-[420px]:justify-center"
            >
              <span className="relative">Ver projetos</span>
              <span className="relative transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                {ArrowIcon}
              </span>
            </a>
            <div className="flex gap-2">
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

      <span className={`${sideLabelClass} left-[clamp(20px,3vw,56px)] rotate-180`}>
        Brasil — UTC-3
      </span>
      <span
        className={`${sideLabelClass} right-[clamp(20px,3vw,56px)] after:h-14 after:w-px after:animate-scroll-hint after:bg-linear-to-b after:from-muted after:to-transparent after:content-['']`}
      >
        Scroll
      </span>
    </section>
  )
}
