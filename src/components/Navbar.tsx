import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'skills', label: 'Skills' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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

  return (
    <header
      className={`fixed left-1/2 z-[100] flex -translate-x-1/2 items-center overflow-hidden border transition-[top,width,height,border-radius,background-color,border-color,box-shadow,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? 'top-4 h-[60px] w-[min(1120px,calc(100%-32px))] rounded-full border-line-strong bg-bg/80 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-[18px]'
          : 'top-0 h-[76px] w-full rounded-none border-transparent bg-transparent shadow-none backdrop-blur-0'
      }`}
    >
      <span
        className={`pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-accent transition-opacity duration-500 ${
          scrolled ? 'opacity-80' : 'opacity-0'
        }`}
        style={{ transform: `scaleX(${progress})` }}
      />

      <div
        className={`mx-auto flex w-full items-center justify-between gap-6 px-[clamp(20px,3vw,56px)] transition-[padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? 'max-w-[1120px] py-2' : 'max-w-[1760px] py-4'
        }`}
      >
        <a
          href="#top"
          className="group flex items-center gap-3 text-ink"
          aria-label="Voltar ao topo"
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

        <nav aria-label="Navegacao principal">
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
                    className={`relative block rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-[300ms] ease-out-expo ${
                      isActive
                        ? 'bg-ink text-bg shadow-[0_10px_30px_rgba(242,240,237,0.12)]'
                        : 'text-muted hover:bg-ink/[0.06] hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

      </div>
    </header>
  )
}
