import { useReveal } from '../hooks/useReveal'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { pt as content } from '../content/siteContent'

const { education } = content

type Certification = {
  title: string
  institution: string
  year: string
  issued: string
  credentialId?: string
  skills?: string[]
}

const certifications = education.certifications as ReadonlyArray<Certification>

export default function Education() {
  const section = useScrollProgress<HTMLElement>()
  const timeline = useScrollProgress<HTMLDivElement>()
  const head = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLDivElement>()
  const certs = useReveal<HTMLDivElement>()
  const intro = useReveal<HTMLParagraphElement>()
  const certsLabel = useReveal<HTMLHeadingElement>()

  return (
    <section className="relative overflow-hidden py-[clamp(96px,14vh,160px)]" id="formacao" ref={section}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[clamp(20px,5vw,96px)] top-[12%] select-none font-mono text-[clamp(80px,14vw,220px)] font-bold leading-none text-ink/[0.025] [transform:translate3d(0,var(--scroll-shift-sm,0px),0)]"
      >
        04
      </span>

      <div className="wrap">
        <div
          className="reveal-head mb-[clamp(48px,8vh,80px)] flex items-baseline justify-between gap-6 max-[640px]:flex-col-reverse max-[640px]:items-start max-[640px]:gap-2"
          ref={head}
        >
          <h2 className="display-type -ml-[0.03em] text-[clamp(28px,6vw,88px)]">{education.title}</h2>
          <span className="font-mono text-[13px] tracking-[0.2em] text-accent">/ 04</span>
        </div>

        <p
          className="reveal mb-[clamp(40px,6vh,64px)] max-w-[680px] text-[clamp(16px,1.8vw,20px)] leading-[1.55] text-muted"
          ref={intro}
        >
          {education.description}
        </p>

        {/* Timeline vertical: trilho com pontos, ritmo distinto das linhas da Experiência */}
        <div className="relative ml-1 border-l border-line pl-12" ref={timeline}>
          <span
            aria-hidden="true"
            className="absolute -left-px bottom-0 top-0 w-px origin-top bg-accent shadow-ember-rail [transform:scaleY(var(--scroll-progress,0))]"
          />
          <div className="reveal-stagger flex flex-col gap-[clamp(48px,7vh,72px)]" ref={grid}>
          {education.items.map((item) => (
            <article className="group relative max-w-[820px]" key={item.degree}>
              <span className="absolute -left-[53px] top-[5px] h-[10px] w-[10px] rounded-full border-2 border-accent bg-bg transition-[background-color,transform,box-shadow] duration-300 group-hover:scale-125 group-hover:bg-accent group-hover:shadow-ember-dot" />
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
                {item.period}
              </span>
              <h3 className="mt-3 text-[clamp(18px,2.2vw,26px)] font-bold leading-[1.2] tracking-[-0.01em] text-ink">
                {item.degree}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-ink-soft">{item.institution}</p>
              <p className="mt-4 text-sm leading-[1.65] text-muted">{item.description}</p>
              <p className="mt-4 font-mono text-[12px] leading-[2] text-muted-deep">
                {item.highlights.map((highlight, j) => (
                  <span key={highlight}>
                    {highlight}
                    {j < item.highlights.length - 1 && (
                      <span className="mx-2.5 text-rule">·</span>
                    )}
                  </span>
                ))}
              </p>
            </article>
          ))}
          </div>
        </div>

        <h3
          className="reveal mb-7 mt-[clamp(56px,8vh,96px)] text-[13px] font-bold uppercase tracking-[0.22em] text-muted"
          ref={certsLabel}
        >
          <span className="text-accent">— </span>
          {education.certificationsLabel}
        </h3>

        {/* Certificações: grade compacta de 3 colunas, leve e escaneável */}
        <div
          className="reveal-stagger grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3"
          ref={certs}
        >
          {certifications.map((cert) => (
            <article
              className="group border-t border-line pt-5 transition-colors duration-500 hover:border-line-strong"
              key={cert.title}
            >
              <span className="font-mono text-[11px] tracking-[0.12em] text-accent">
                {cert.year}
              </span>
              <h4 className="mt-3 text-[15px] font-bold leading-[1.3] text-ink">{cert.title}</h4>
              <p className="mt-1 text-sm text-muted">{cert.institution}</p>
              {cert.credentialId && (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-faint">
                  {education.credentialIdLabel}: {cert.credentialId}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
