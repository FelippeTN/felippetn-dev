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

  // Scroll-spy: destaca o link da seção visível
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (s): s is HTMLElement => s !== null,
    )

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[101] h-0.5 w-full origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-[100] flex h-[72px] items-center border-b transition-colors duration-[400ms] ${
          scrolled
            ? 'border-line bg-bg/70 backdrop-blur-[16px]'
            : 'border-transparent'
        }`}
      >
        <div className="wrap flex items-center justify-between gap-6">
          <a href="#top" className="text-lg font-extrabold tracking-[0.02em] [font-stretch:115%]">
            FTN<sup className="ml-0.5 text-[10px] text-accent">©</sup>
          </a>

          <nav aria-label="Navegação principal">
            <ul className="flex list-none gap-1 max-[860px]:hidden">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`relative block px-3.5 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-[250ms] after:absolute after:bottom-0.5 after:left-3.5 after:right-3.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-[350ms] after:ease-out-expo after:content-[''] hover:text-ink ${
                      active === link.id
                        ? 'text-ink after:scale-x-100'
                        : 'text-muted after:scale-x-0'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#contato"
            className="flex items-center gap-2.5 rounded-full border border-line px-4 py-2 font-mono text-[11px] tracking-[0.08em] text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink"
          >
            <span className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-[#3ddc84] shadow-[0_0_10px_rgba(61,220,132,0.8)]" />
            <span className="max-[560px]:hidden">Disponível para projetos</span>
          </a>
        </div>
      </header>
    </>
  )
}
