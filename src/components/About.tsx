import { useReveal } from '../hooks/useReveal'
import { pt as content } from './siteContent'

const { about } = content

export default function About() {
  const head = useReveal<HTMLDivElement>()
  const intro = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden py-[clamp(96px,14vh,160px)]" id="sobre">
      <div className="wrap">
        <div
          className="reveal-head mb-[clamp(48px,8vh,80px)] flex items-baseline justify-between gap-6"
          ref={head}
        >
          <h2 className="display-type -ml-[0.03em] text-[clamp(40px,6vw,88px)]">{about.title}</h2>
          <span className="font-mono text-[13px] tracking-[0.2em] text-accent">/ 01</span>
        </div>

        <div className="reveal mb-[clamp(40px,6vh,72px)] max-w-[940px]" ref={intro}>
          <p className="text-[clamp(20px,2.4vw,30px)] font-medium leading-[1.45] tracking-[-0.01em] text-muted">
            {about.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-line bg-bg-soft px-6 py-5 sm:flex-row sm:items-start sm:gap-5">
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              {about.funFactLabel}
            </span>
            <p className="text-sm leading-[1.6] text-muted">{about.funFact}</p>
          </div>
        </div>

        <div
          className="reveal-stagger grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4"
          ref={grid}
        >
          {about.features.map((feature) => (
            <div
              className="rounded-2xl border border-line bg-bg-soft px-7 py-7 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-[3px] hover:border-line-strong"
              key={feature.title}
            >
              <h3 className="mb-2.5 text-[16px] font-bold uppercase tracking-[0.03em] [font-stretch:110%]">
                {feature.title}
              </h3>
              <p className="text-sm leading-[1.6] text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
