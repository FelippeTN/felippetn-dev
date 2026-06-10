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
      <div className="scroll-progress" style={{ '--progress': progress } as React.CSSProperties} />
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav__inner">
          <a href="#top" className="nav__logo">
            FTN<sup>©</sup>
          </a>

          <nav aria-label="Navegação principal">
            <ul className="nav__links">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`nav__link ${active === link.id ? 'active' : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#contato" className="nav__status">
            <span className="nav__status-dot" />
            <span>Disponível para projetos</span>
          </a>
        </div>
      </header>
    </>
  )
}
