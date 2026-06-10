export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="wrap flex flex-wrap items-center justify-between gap-4 font-mono text-xs tracking-[0.06em] text-muted">
        <span>© {new Date().getFullYear()} Felippe Toscano Nalim</span>
        <span>Feito com React + TypeScript + Vite</span>
        <a href="#top" className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-accent">
          Voltar ao topo
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
