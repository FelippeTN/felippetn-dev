import { useReveal } from '../hooks/useReveal'
import { useHorizontalScroll } from '../hooks/useHorizontalScroll'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { pt as content } from '../content/siteContent'

const { skills } = content

const icon = (path: string) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={path} />
  </svg>
)

/* Um ícone por categoria, na mesma ordem de skills.categories */
const ICONS = [
  'M5 4h14v6H5zM5 14h14v6H5zM8 7h.01M8 17h.01', // Backend & Sistemas
  'M4 5h16v11H4zM2 19h20M9 16l1.5 3M15 16l-1.5 3', // Frontend
  'M7 7h10v10H7zM9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2', // IA & Dados
  'M17.5 19a4.5 4.5 0 0 0 .42-8.98 6 6 0 0 0-11.7 1.62A4 4 0 0 0 6.5 19z', // DevOps & Infra
  'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3', // Banco de Dados
  'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', // Soft Skills
]

// O glow do card segue a posição do mouse via CSS vars
const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  card.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

type Category = (typeof skills.categories)[number]

function SkillCard({
  category,
  index,
  className = '',
}: {
  category: Category
  index: number
  className?: string
}) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-bg-soft px-7 py-8 transition-[border-color,transform] duration-300 ease-out-expo before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,90,31,0.09),transparent_60%)] before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-[''] hover:-translate-y-[3px] hover:border-line-strong hover:before:opacity-100 ${className}`}
      onMouseMove={onMouseMove}
    >
      <div className="relative mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent">
          {icon(ICONS[index % ICONS.length])}
        </span>
        <h3 className="text-[17px] font-bold uppercase tracking-[0.04em] [font-stretch:110%]">
          {category.title}
        </h3>
        <span className="ml-auto font-mono text-[12px] text-muted/70">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="relative flex flex-wrap content-start gap-1.5">
        {category.skills.map((skill) => (
          <span className="tag group-hover:border-line-strong group-hover:text-ink" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---- Fallback estático (prefers-reduced-motion): grade tradicional ---- */
function SkillsGrid() {
  const head = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLDivElement>()

  return (
    <section className="relative py-[clamp(96px,14vh,160px)]" id="skills">
      <div className="wrap">
        <div
          className="reveal-head mb-[clamp(48px,8vh,80px)] flex items-baseline justify-between gap-6"
          ref={head}
        >
          <h2 className="display-type -ml-[0.03em] text-[clamp(40px,6vw,88px)]">{skills.title}</h2>
          <span className="font-mono text-[13px] tracking-[0.2em] text-accent">/ 02</span>
        </div>

        <p className="reveal mb-[clamp(40px,6vh,64px)] max-w-[680px] text-[clamp(16px,1.8vw,20px)] leading-[1.55] text-muted">
          {skills.description}
        </p>

        <div
          className="reveal-stagger grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4"
          ref={grid}
        >
          {skills.categories.map((category, i) => (
            <SkillCard category={category} index={i} key={category.title} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Experiência horizontal: o scroll vertical empurra o conteúdo para o lado ---- */
function SkillsHorizontal() {
  const { sectionRef, trackRef } = useHorizontalScroll<HTMLElement, HTMLDivElement>()
  const total = skills.categories.length

  return (
    <section className="relative" id="skills" ref={sectionRef}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Rótulo fixo do topo, permanece enquanto os painéis deslizam */}
        <div className="wrap pointer-events-none absolute inset-x-0 top-[max(88px,12vh)] flex items-baseline justify-between">
          <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted">
            Habilidades
          </span>
          <span className="font-mono text-[13px] tracking-[0.2em] text-accent">/ 02</span>
        </div>

        {/* Trilha horizontal — translada via JS conforme o scroll */}
        <div
          className="h-scroll-track flex items-center gap-5 px-[clamp(40px,4.5vw,88px)] [@media(prefers-reduced-motion:no-preference)]:will-change-transform"
          ref={trackRef}
        >
          {/* Painel de introdução */}
          <div className="flex h-[clamp(360px,62vh,560px)] w-[clamp(300px,46vw,620px)] shrink-0 flex-col justify-center pr-4">
            <h2 className="display-type text-[clamp(40px,5.4vw,80px)]">{skills.title}</h2>
            <p className="mt-6 max-w-[460px] text-[clamp(16px,1.8vw,20px)] leading-[1.55] text-muted">
              {skills.description}
            </p>
            <div className="mt-10 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
              <span className="animate-nudge-x text-accent">→</span>
              Role para o lado
              <span className="text-ink/40">·</span>
              <span>{total} categorias</span>
            </div>
          </div>

          {/* Painéis de categoria */}
          {skills.categories.map((category, i) => (
            <SkillCard
              category={category}
              index={i}
              key={category.title}
              className="h-[clamp(360px,62vh,560px)] w-[clamp(280px,34vw,420px)] shrink-0"
            />
          ))}
        </div>

        {/* Barra de progresso horizontal */}
        <div className="wrap absolute inset-x-0 bottom-[max(40px,7vh)]">
          <div className="h-px w-full overflow-hidden bg-line">
            <span
              className="block h-full origin-left bg-accent"
              style={{ transform: 'scaleX(var(--hp,0))' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Skills() {
  const reduced = useReducedMotion()
  return reduced ? <SkillsGrid /> : <SkillsHorizontal />
}
