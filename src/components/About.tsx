import { useReveal } from '../hooks/useReveal'
import { useTilt } from '../hooks/useTilt'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { pt as content } from '../content/siteContent'
import fastapiPhoto from '../assets/fastapi.jpeg'
import felippePhoto from '../assets/Felippe.jpg'

const { about } = content

type Feature = (typeof about.features)[number]

/* Larguras do bento grid (12 colunas): pares 7/5, 5/7, 8/4 criam ritmo assimétrico */
const BENTO_SPANS = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-8',
  'lg:col-span-4',
]

/* Card do bento com tilt 3D (segue o cursor) + reflexo que acompanha o ponteiro */
function BentoCard({ feature, index }: { feature: Feature; index: number }) {
  const tilt = useTilt<HTMLDivElement>({ max: 6, scale: 1.015 })
  const n = String(index + 1).padStart(2, '0')

  return (
    <div
      ref={tilt}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-bg-soft p-8 transition-[border-color,background-color] duration-500 ease-out-expo will-change-transform hover:border-line-strong hover:bg-surface ${BENTO_SPANS[index % BENTO_SPANS.length]}`}
    >
      {/* Reflexo que segue o cursor (glare) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(360px_circle_at_var(--gx,50%)_var(--gy,50%),rgba(255,255,255,0.06),transparent_55%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-7 select-none font-mono text-[110px] font-bold leading-none text-ink/[0.035] transition-colors duration-500 group-hover:text-accent/[0.06]"
      >
        {n}
      </span>
      <span className="relative font-mono text-[12px] tracking-[0.14em] text-accent">{n}</span>
      <h3 className="relative mb-2.5 mt-5 text-[16px] font-bold uppercase tracking-[0.03em] [font-stretch:110%]">
        {feature.title}
      </h3>
      <p className="relative max-w-[480px] text-sm leading-[1.65] text-muted">
        {feature.description}
      </p>
    </div>
  )
}

export default function About() {
  const section = useScrollProgress<HTMLElement>()
  const head = useReveal<HTMLDivElement>()
  const intro = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden py-[clamp(96px,14vh,160px)]" id="sobre" ref={section}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[18%] h-px w-full origin-left bg-linear-to-r from-transparent via-accent/45 to-transparent [transform:scaleX(var(--scroll-reveal,0))]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(20px,5vw,96px)] top-[18%] select-none font-mono text-[clamp(80px,13vw,190px)] font-bold leading-none text-ink/[0.025] [transform:translate3d(0,var(--scroll-shift-md,0px),0)]"
      >
        01
      </span>

      <div className="wrap">
        <div
          className="reveal-head mb-[clamp(48px,8vh,80px)] flex items-baseline justify-between gap-6"
          ref={head}
        >
          <h2 className="display-type -ml-[0.03em] text-[clamp(40px,6vw,88px)]">{about.title}</h2>
          <span className="font-mono text-[13px] tracking-[0.2em] text-accent">/ 01</span>
        </div>

        <div
          className="reveal mb-[clamp(40px,6vh,72px)] grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.45fr)] lg:items-start"
          ref={intro}
        >
          <div>
            <p className="text-[clamp(20px,2.4vw,30px)] font-medium leading-[1.45] tracking-[-0.01em] text-muted">
              {about.description}
            </p>

          <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:gap-8">
            <a
              href={fastapiPhoto}
              target="_blank"
              rel="noreferrer"
              className="group relative block shrink-0 overflow-hidden rounded-lg max-sm:w-full"
              style={{
                transform: 'translate3d(0, var(--scroll-shift-sm, 0px), 0)',
              }}
            >
              <img
                src={fastapiPhoto}
                alt="Felippe ao lado de Sebastián Ramírez (Tiangolo), criador do FastAPI"
                loading="lazy"
                draggable={false}
                className="h-full max-h-[220px] w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.04] sm:h-[160px] sm:w-[220px]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/90">
                eu &amp; Tiangolo · FastAPI
              </span>
            </a>
            <div>
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {about.funFactLabel}
              </span>
              <p className="text-sm leading-[1.6] text-muted">{about.funFact}</p>
            </div>
          </div>
          </div>

          <figure
            className="relative overflow-hidden rounded-2xl border border-line bg-bg-soft max-lg:max-w-[420px]"
            style={{
              transform: 'translate3d(0, var(--scroll-shift-sm, 0px), 0)',
            }}
          >
            <img
              src={felippePhoto}
              alt="Retrato de Felippe Toscano Nalim"
              loading="lazy"
              draggable={false}
              className="aspect-[4/5] w-full object-cover object-center [filter:contrast(1.04)_saturate(0.92)]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-5 pb-5 pt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/85">
              Felippe Toscano Nalim
            </figcaption>
          </figure>
        </div>

        {/* Bento grid assimétrico: tamanhos variados quebram a monotonia */}
        <div className="reveal-stagger grid grid-cols-1 gap-4 lg:grid-cols-12" ref={grid}>
          {about.features.map((feature, i) => (
            <BentoCard feature={feature} index={i} key={feature.title} />
          ))}
        </div>
      </div>
    </section>
  )
}
