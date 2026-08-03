import { useEffect, useRef, useState } from 'react'
import { subscribeToScroll } from '../lib/scrollScheduler'

const LINKS = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'formacao', label: 'Formação' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // `scrolled` é booleano e só muda ao cruzar o limiar, então o React
    // descarta o set repetido. Já o progresso muda a cada pixel: mantê-lo em
    // estado re-renderizava o header inteiro por evento de scroll. Ele agora
    // vai direto ao DOM como transform, fora do ciclo de render.
    let progress = 0

    return subscribeToScroll({
      read() {
        const max = document.documentElement.scrollHeight - window.innerHeight
        progress = max > 0 ? window.scrollY / max : 0
        setScrolled(window.scrollY > 24)
      },
      write() {
        progressRef.current?.style.setProperty('transform', `scaleX(${progress.toFixed(4)})`)
      },
    })
  }, [])

  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(
      (section): section is HTMLElement => section !== null,
    )

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const close = () => setMenuOpen(false)

    // Esc fecha e devolve o foco ao botão: sem isso o teclado ficaria preso
    // no fim do documento depois que o menu some.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }

    window.addEventListener('resize', close)
    window.addEventListener('scroll', close, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('resize', close)
      window.removeEventListener('scroll', close)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed left-1/2 z-[100] flex -translate-x-1/2 items-center overflow-hidden border transition-[top,width,height,border-radius,background-color,border-color,box-shadow,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled || menuOpen
            ? 'top-[calc(1rem+env(safe-area-inset-top))] h-[60px] w-[min(1120px,calc(100%-32px))] rounded-full border-line-strong bg-bg/80 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-[18px]'
            : 'top-[env(safe-area-inset-top)] h-[76px] w-full rounded-none border-transparent bg-transparent shadow-none backdrop-blur-0'
        }`}
      >
        <span
          ref={progressRef}
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-opacity duration-500 ${
            scrolled ? 'opacity-80' : 'opacity-0'
          }`}
        />

      <div
        className={`mx-auto flex w-full items-center justify-between gap-6 px-[clamp(20px,3vw,56px)] transition-[padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? 'max-w-[1120px] py-2' : 'max-w-[1760px] py-4'
        }`}
      >
        <a
          href="#top"
          className="group flex min-h-11 min-w-11 items-center gap-3 text-ink"
          /* O aria-label substitui o texto visível, então precisa conter o nome
             que está na tela — e distinguir este link dos outros dois que
             também levam ao topo. */
          aria-label="Felippe TN — voltar ao topo"
        >
          <span
            className={`grid place-items-center rounded-full border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              scrolled
                ? 'h-10 w-10 border-line bg-transparent p-2'
                : 'h-11 w-11 border-line-strong bg-transparent p-2.5'
            }`}
          >
            <img
              src="/code.svg"
              alt=""
              className={`h-full w-full object-contain transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                scrolled ? 'scale-95 invert' : 'scale-100 invert'
              }`}
              draggable={false}
            />
          </span>
          <span className="hidden leading-none min-[520px]:block">
            <span className="block text-[13px] font-bold tracking-[0.08em]">Felippe TN</span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Software Engineer
            </span>
          </span>
        </a>

        <nav aria-label="Navegação principal">
          <ul
            className={`flex list-none items-center gap-1 rounded-full border transition-all duration-500 ease-out-expo max-[860px]:hidden ${
              scrolled
                ? 'border-line bg-surface/55 p-1'
                : 'border-transparent bg-ink/[0.03] p-1.5'
            }`}
          >
            {LINKS.map((link) => {
              const isActive = active === link.id

              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-[background-color,color] duration-[300ms] ease-out-expo ${
                      isActive
                        ? 'bg-ink text-bg shadow-[0_10px_30px_rgba(242,240,237,0.12)]'
                        : 'text-muted hover:bg-ink/[0.06] hover:text-ink focus-visible:bg-ink/[0.06] focus-visible:text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="grid min-h-11 min-w-11 place-items-center rounded-full border border-line px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink focus-visible:border-line-strong focus-visible:text-ink min-[861px]:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Fechar' : 'Menu'}
        </button>
      </div>
      </header>

      {/* `invisible` (visibility: hidden) tira os links da ordem de tabulação —
          opacity-0 sozinho os mantinha focáveis, jogando o teclado para links
          que ninguém vê. A visibilidade entra na transição para só desligar
          depois que o fade termina. */}
      <nav
        id="mobile-nav"
        aria-label="Navegação mobile"
        className={`fixed left-4 right-4 top-[calc(88px+env(safe-area-inset-top))] z-[99] rounded-2xl border border-line-strong bg-bg/95 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-[18px] transition-[opacity,transform,visibility] duration-300 min-[861px]:hidden ${
          menuOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <ul className="grid gap-1">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`block rounded-xl px-4 py-3 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                  active === link.id
                    ? 'bg-ink text-bg'
                    : 'text-muted hover:bg-ink/[0.06] hover:text-ink focus-visible:bg-ink/[0.06] focus-visible:text-ink'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
