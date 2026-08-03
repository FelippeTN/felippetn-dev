import { useReveal } from '../hooks/useReveal'
import { useScrollProgress } from '../hooks/useScrollProgress'

const EMAIL = 'felippenalim2004@gmail.com'
const WHATSAPP = '5521979076630'
const WHATSAPP_LABEL = '(21) 97907-6630'

/* Mesmos rótulos e mesma ordem do menu principal: um destino, um nome.
   Antes o rodapé dizia "Skills" onde a nav dizia "Habilidades", escrevia
   "Experiencia" sem acento e omitia Formação. */
const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Formação', href: '#formacao' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/FelippeTN',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/felippe-toscano-nalim',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@felippetndev',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const footer = useScrollProgress<HTMLElement>()
  const content = useReveal<HTMLDivElement>()

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-soft/45" ref={footer}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/70 to-transparent" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-0.18em] left-1/2 select-none whitespace-nowrap text-[clamp(86px,17vw,260px)] font-extrabold uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.055)] [font-stretch:118%] max-[640px]:hidden"
        style={{
          opacity: 'var(--scroll-opacity, 0.2)',
          transform: 'translate3d(calc(-50% + var(--scroll-shift-sm, 0px)), 0, 0)',
        }}
      >
        Felippe TN
      </span>

      <div className="wrap reveal py-[clamp(48px,8vw,88px)]" ref={content}>
        <div className="grid gap-12 max-[640px]:gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(240px,0.7fr)_minmax(220px,0.55fr)]">
          <div>
            <a
              href="#top"
              className="group inline-flex items-center gap-4"
              aria-label="Felippe Toscano Nalim — voltar ao topo"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent group-hover:bg-accent-soft group-focus-visible:border-accent group-focus-visible:bg-accent-soft">
                <img src="/code.svg" alt="" className="h-6 w-6 invert" draggable={false} />
              </span>
              <span>
                <span className="block text-lg font-bold tracking-[0.08em] text-ink">
                  Felippe Toscano Nalim
                </span>
                <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  Software Engineer
                </span>
              </span>
            </a>

            <p className="mt-8 max-w-[620px] text-[clamp(22px,3vw,42px)] font-semibold leading-[1.08] tracking-[-0.01em] text-ink max-[640px]:text-[24px]">
              Backend, IA e produtos digitais com foco em performance, clareza e impacto real.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                Rio de Janeiro, BR
              </span>
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="label-mono mb-5 text-accent">Navegação</h2>
            <ul className="grid gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="touch-target group inline-flex items-center gap-3 text-sm text-muted transition-colors duration-300 hover:text-ink focus-visible:text-ink"
                  >
                    <span className="h-px w-5 bg-line-strong transition-all duration-300 group-hover:w-8 group-hover:bg-accent group-focus-visible:w-8 group-focus-visible:bg-accent" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label-mono mb-5 text-accent">Contato</h2>
            <a
              href={`mailto:${EMAIL}`}
              className="touch-target inline-block break-all text-sm text-muted transition-colors duration-300 hover:text-ink focus-visible:text-ink"
            >
              {EMAIL}
            </a>

            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="touch-target mt-3 inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-ink focus-visible:text-ink"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2A9.94 9.94 0 0 0 2.1 11.94c0 1.75.46 3.45 1.34 4.96L2 22l5.24-1.38a9.9 9.9 0 0 0 4.8 1.22h.01A9.94 9.94 0 0 0 12.04 2Zm5.85 14.22c-.25.7-1.45 1.34-2.03 1.43-.52.08-1.18.12-1.91-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5-4.36-5.15-4.56-.15-.2-1.23-1.64-1.23-3.13s.78-2.22 1.06-2.52c.28-.3.61-.38.81-.38h.58c.18.01.44-.07.69.53.25.6.85 2.08.93 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.31-.13.61.18.3.79 1.31 1.7 2.12 1.17 1.04 2.16 1.36 2.46 1.51.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.41-.25.69-.15.28.1 1.78.84 2.09.99.31.15.51.23.59.36.08.13.08.76-.17 1.46Z" />
              </svg>
              WhatsApp {WHATSAPP_LABEL}
            </a>

            <div className="mt-6 flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-btn border border-line"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted max-[640px]:mt-10 max-[640px]:items-start max-[640px]:tracking-[0.08em]">
          <span className="max-w-full leading-relaxed">&copy; {new Date().getFullYear()} Felippe Toscano Nalim. Todos os direitos reservados.</span>
          <a href="#top" className="touch-target group inline-flex items-center gap-2 transition-colors duration-300 hover:text-accent focus-visible:text-accent">
            Voltar ao topo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
