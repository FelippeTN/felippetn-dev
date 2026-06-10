import { useReveal } from '../hooks/useReveal'

type Skill = {
  title: string
  desc: string
  tags: string[]
  icon: React.ReactNode
}

const icon = (path: string) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={path} />
  </svg>
)

const SKILLS: Skill[] = [
  {
    title: 'Frontend',
    desc: 'Interfaces rápidas, acessíveis e com micro-interações que fazem diferença.',
    tags: ['React', 'TypeScript', 'Next.js', 'Vite'],
    icon: icon('M4 5h16v11H4zM2 19h20M9 16l1.5 3M15 16l-1.5 3'),
  },
  {
    title: 'Backend',
    desc: 'APIs robustas e escaláveis, com arquitetura limpa e foco em performance.',
    tags: ['Node.js', 'Python', 'REST', 'GraphQL'],
    icon: icon('M5 4h14v6H5zM5 14h14v6H5zM8 7h.01M8 17h.01'),
  },
  {
    title: 'Banco de dados',
    desc: 'Modelagem eficiente, queries otimizadas e dados confiáveis em produção.',
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
    icon: icon('M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3'),
  },
  {
    title: 'DevOps & Cloud',
    desc: 'Deploys automatizados, infraestrutura como código e observabilidade.',
    tags: ['Docker', 'AWS', 'CI/CD', 'Linux'],
    icon: icon('M17.5 19a4.5 4.5 0 0 0 .42-8.98 6 6 0 0 0-11.7 1.62A4 4 0 0 0 6.5 19z'),
  },
]

export default function Skills() {
  const head = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLDivElement>()

  // O glow do card segue a posição do mouse via CSS vars
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    card.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section__head reveal" ref={head}>
          <h2 className="section__title display">O que eu faço</h2>
          <span className="section__index">/ 02</span>
        </div>

        <div className="skills__grid reveal" ref={grid}>
          {SKILLS.map((skill) => (
            <div className="skill-card" key={skill.title} onMouseMove={onMouseMove}>
              <div className="skill-card__icon">{skill.icon}</div>
              <h3 className="skill-card__title">{skill.title}</h3>
              <p className="skill-card__desc">{skill.desc}</p>
              <div className="skill-card__tags">
                {skill.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
