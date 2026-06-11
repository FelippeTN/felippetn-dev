import { useReveal } from '../hooks/useReveal'

type Project = {
  title: string
  desc: string
  tags: string[]
  url: string
}

const PROJECTS: Project[] = [
  {
    title: 'Projeto Um',
    desc: 'Plataforma web full-stack com autenticação, dashboard e relatórios em tempo real.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    url: 'https://github.com/FelippeTN',
  },
  {
    title: 'Projeto Dois',
    desc: 'API de alta performance servindo milhares de requisições por minuto.',
    tags: ['Python', 'FastAPI', 'Docker'],
    url: 'https://github.com/FelippeTN',
  },
  {
    title: 'Projeto Três',
    desc: 'Aplicação mobile-first com foco em experiência do usuário e acessibilidade.',
    tags: ['TypeScript', 'Next.js', 'Tailwind'],
    url: 'https://github.com/FelippeTN',
  },
]

const ArrowIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Projects() {
  const head = useReveal<HTMLDivElement>()
  const list = useReveal<HTMLDivElement>()

  return (
    <section className="relative py-[clamp(96px,14vh,160px)]" id="projetos">
      <div className="wrap">
        <div
          className="reveal-head mb-[clamp(48px,8vh,80px)] flex items-baseline justify-between gap-6"
          ref={head}
        >
          <h2 className="display-type -ml-[0.03em] text-[clamp(40px,6vw,88px)]">Projetos</h2>
          <span className="font-mono text-[13px] tracking-[0.2em] text-accent">/ 03</span>
        </div>

        <div
          className="reveal-stagger reveal-stagger-alt flex flex-col border-t border-line"
          ref={list}
        >
          {PROJECTS.map((project, i) => (
            <a
              className="group relative grid grid-cols-[80px_1fr_auto_auto] items-center gap-[clamp(16px,3vw,48px)] overflow-hidden border-b border-line px-2 py-[clamp(28px,4vh,44px)] transition-all duration-[400ms] ease-out-expo hover:bg-bg-soft hover:px-6 max-[720px]:grid-cols-[1fr_auto]"
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="font-mono text-[13px] text-muted transition-colors duration-300 group-hover:text-accent max-[720px]:hidden">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[clamp(22px,3.2vw,40px)] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] transition-transform duration-[400ms] ease-out-expo [font-stretch:112%] group-hover:translate-x-1.5">
                  {project.title}
                </h3>
                <p className="mt-1.5 max-w-[520px] text-sm text-muted">{project.desc}</p>
              </div>
              <div className="flex flex-wrap justify-end gap-1.5 max-[720px]:hidden">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <span className="grid h-13 w-13 place-items-center rounded-full border border-line text-muted transition-all duration-[350ms] ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                {ArrowIcon}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
