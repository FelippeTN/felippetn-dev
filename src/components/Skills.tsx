import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useHorizontalScroll } from '../hooks/useHorizontalScroll'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { pt as content } from '../content/siteContent'

const { skills } = content

type Category = (typeof skills.categories)[number]

/* Painel editorial: número fantasma gigante, título display, pills escaneáveis */
function SkillPanel({
  category,
  index,
  className = '',
  tilt = false,
}: {
  category: Category
  index: number
  className?: string
  tilt?: boolean
}) {
  return (
    <div
      className={`group relative flex flex-col justify-center ${className}`}
      {...(tilt ? { 'data-tilt': '' } : {})}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none select-none font-mono text-[clamp(80px,10vw,140px)] font-bold leading-[0.85] text-ink/[0.05] transition-colors duration-700 group-hover:text-accent/[0.08]"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="mt-2 h-px w-12 bg-accent transition-[width] duration-500 ease-out-expo group-hover:w-20" />
      <h3 className="display-type mt-6 text-[clamp(24px,2.6vw,40px)]">{category.title}</h3>
      <div className="mt-8 flex max-w-[560px] flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span className="tag hover:border-line-strong hover:text-ink" key={skill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Painéis com mais skills ganham mais largura na trilha horizontal */
const panelWidth = (category: Category) =>
  category.skills.length > 12
    ? 'w-[clamp(320px,40vw,640px)]'
    : 'w-[clamp(300px,30vw,480px)]'

/* ---- Fallback estático (prefers-reduced-motion): grade aberta ---- */
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

        <div className="reveal-stagger grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-10 gap-y-12" ref={grid}>
          {skills.categories.map((category, i) => (
            <SkillPanel
              category={category}
              index={i}
              key={category.title}
              className="border-t border-line pt-7"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Experiência horizontal: o scroll vertical empurra o conteúdo para o lado ---- */
function SkillsHorizontal() {
  const { sectionRef, trackRef } = useHorizontalScroll<HTMLElement, HTMLDivElement>({
    tilt3d: true,
  })
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
          className="h-scroll-track flex items-center gap-[clamp(40px,5vw,96px)] px-[clamp(40px,4.5vw,88px)] [@media(prefers-reduced-motion:no-preference)]:will-change-transform"
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

          {/* Painéis de categoria — largura proporcional ao conteúdo */}
          {skills.categories.map((category, i) => (
            <SkillPanel
              category={category}
              index={i}
              key={category.title}
              tilt
              className={`h-[clamp(360px,62vh,560px)] shrink-0 [backface-visibility:hidden] ${panelWidth(category)}`}
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)')
    const sync = () => setIsMobile(media.matches)

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return reduced || isMobile ? <SkillsGrid /> : <SkillsHorizontal />
}
