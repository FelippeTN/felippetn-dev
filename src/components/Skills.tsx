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
    <section className="relative py-[clamp(96px,14vh,160px)]" id="skills">
      <div className="wrap">
        <div
          className="reveal mb-[clamp(48px,8vh,80px)] flex items-baseline justify-between gap-6"
          ref={head}
        >
          <h2 className="display-type -ml-[0.03em] text-[clamp(40px,6vw,88px)]">O que eu faço</h2>
          <span className="font-mono text-[13px] tracking-[0.2em] text-accent">/ 02</span>
        </div>

        <div
          className="reveal grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4"
          ref={grid}
        >
          {SKILLS.map((skill) => (
            <div
              className="group relative overflow-hidden rounded-2xl border border-line bg-bg-soft px-7 py-8 transition-[border-color,transform] duration-300 ease-out-expo before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,90,31,0.09),transparent_60%)] before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-[''] hover:-translate-y-[3px] hover:border-line-strong hover:before:opacity-100"
              key={skill.title}
              onMouseMove={onMouseMove}
            >
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-accent">
                {skill.icon}
              </div>
              <h3 className="mb-2 text-[17px] font-bold uppercase tracking-[0.04em] [font-stretch:110%]">
                {skill.title}
              </h3>
              <p className="mb-[18px] text-sm leading-[1.6] text-muted">{skill.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {skill.tags.map((tag) => (
                  <span
                    className="tag group-hover:border-line-strong group-hover:text-ink"
                    key={tag}
                  >
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
