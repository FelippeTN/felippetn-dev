import { useReveal } from '../hooks/useReveal'
import { pt as content } from './siteContent'

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
  const head = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLDivElement>()
  const certs = useReveal<HTMLDivElement>()

  return (
    <section className="relative py-[clamp(96px,14vh,160px)]" id="formacao">
      <div className="wrap">
        <div
          className="reveal-head mb-[clamp(48px,8vh,80px)] flex items-baseline justify-between gap-6"
          ref={head}
        >
          <h2 className="display-type -ml-[0.03em] text-[clamp(40px,6vw,88px)]">{education.title}</h2>
          <span className="font-mono text-[13px] tracking-[0.2em] text-accent">/ 04</span>
        </div>

        <p className="reveal mb-[clamp(40px,6vh,64px)] max-w-[680px] text-[clamp(16px,1.8vw,20px)] leading-[1.55] text-muted">
          {education.description}
        </p>

        <div
          className="reveal-stagger grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-4"
          ref={grid}
        >
          {education.items.map((item) => (
            <article
              className="flex flex-col rounded-2xl border border-line bg-bg-soft px-7 py-7 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-[3px] hover:border-line-strong"
              key={item.degree}
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
                {item.period}
              </span>
              <h3 className="mt-3 text-[19px] font-bold leading-[1.2] tracking-[-0.01em] text-ink">
                {item.degree}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-ink/70">{item.institution}</p>
              <p className="mt-4 text-sm leading-[1.6] text-muted">{item.description}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {item.highlights.map((highlight) => (
                  <span className="tag" key={highlight}>
                    {highlight}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <h3 className="reveal mb-7 mt-[clamp(56px,8vh,96px)] text-[13px] font-bold uppercase tracking-[0.22em] text-muted">
          <span className="text-accent">— </span>
          {education.certificationsLabel}
        </h3>

        <div
          className="reveal-stagger grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4"
          ref={certs}
        >
          {certifications.map((cert) => (
            <article
              className="rounded-xl border border-line bg-bg-soft px-6 py-6 transition-[border-color] duration-300 hover:border-line-strong"
              key={cert.title}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h4 className="text-[15px] font-bold leading-[1.25] text-ink">{cert.title}</h4>
                <span className="shrink-0 font-mono text-[11px] tracking-[0.1em] text-accent">
                  {cert.year}
                </span>
              </div>
              <p className="text-sm font-medium text-ink/70">{cert.institution}</p>

              {cert.credentialId && (
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                  {education.credentialIdLabel}: {cert.credentialId}
                </p>
              )}

              {cert.skills && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span className="tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
