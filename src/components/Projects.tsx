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
    <section className="section" id="projetos">
      <div className="container">
        <div className="section__head reveal" ref={head}>
          <h2 className="section__title display">Projetos</h2>
          <span className="section__index">/ 03</span>
        </div>

        <div className="projects__list reveal" ref={list}>
          {PROJECTS.map((project, i) => (
            <a
              className="project"
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="project__index">{String(i + 1).padStart(2, '0')}</span>
              <div className="project__info">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
              <div className="project__tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <span className="project__arrow">{ArrowIcon}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
