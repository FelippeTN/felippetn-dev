import { useReveal } from '../hooks/useReveal'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { pt as content } from '../content/siteContent'

const { experience } = content

export default function Experience() {
  const section = useScrollProgress<HTMLElement>()
  const timeline = useScrollProgress<HTMLDivElement>()
  const head = useReveal<HTMLDivElement>()
  const list = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden py-[clamp(96px,14vh,160px)]" id="experiencia" ref={section}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(24px,6vw,120px)] top-[8%] select-none font-mono text-[clamp(90px,17vw,260px)] font-bold leading-none text-ink/[0.025] [transform:translate3d(0,var(--scroll-shift-md-neg,0px),0)]"
      >
        03
      </span>

      <div className="wrap">
        <div
          className="reveal-head mb-[clamp(48px,8vh,80px)] flex items-baseline justify-between gap-6"
          ref={head}
        >
          <h2 className="display-type -ml-[0.03em] text-[clamp(32px,6vw,88px)]">{experience.title}</h2>
          <span className="font-mono text-[13px] tracking-[0.2em] text-accent">/ 03</span>
        </div>

        <p className="reveal mb-[clamp(40px,6vh,64px)] max-w-[680px] text-[clamp(16px,1.8vw,20px)] leading-[1.55] text-muted">
          {experience.description}
        </p>

        <div className="relative border-t border-line" ref={timeline}>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[5px] top-0 w-px bg-line-strong lg:left-[219px]"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-accent shadow-[0_0_28px_rgba(255,90,31,0.35)] [transform:scaleY(var(--scroll-progress,0))] lg:left-[219px]"
          />

          <div className="reveal-stagger relative flex flex-col" ref={list}>
            {experience.items.map((item) => (
              <article
                className="group relative grid grid-cols-[220px_1fr] gap-[clamp(20px,4vw,64px)] border-b border-line py-[clamp(32px,5vh,56px)] pl-8 transition-colors duration-300 hover:bg-bg-soft/40 max-[760px]:grid-cols-1 max-[760px]:gap-4 lg:pl-0"
                key={`${item.title}-${item.company}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[clamp(32px,5vh,56px)] h-3 w-3 rounded-full border border-accent bg-bg shadow-[0_0_22px_rgba(255,90,31,0.42)] transition-[transform,background-color] duration-300 group-hover:scale-125 group-hover:bg-accent lg:left-[214px]"
                />
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
                    {item.period}
                  </span>
                  <span className="h-px w-10 bg-line-strong transition-[width] duration-[400ms] ease-out-expo group-hover:w-16" />
                </div>

                <div>
                  <h3 className="text-[clamp(20px,2.6vw,32px)] font-extrabold uppercase leading-[1.08] tracking-[-0.01em] [font-stretch:110%]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] font-medium text-ink/80">{item.company}</p>
                  <p className="mt-4 max-w-[720px] text-[15px] leading-[1.65] text-muted">
                    {item.description}
                  </p>

                  <ul className="mt-5 grid gap-2.5">
                    {item.achievements.map((achievement) => (
                      <li className="flex gap-3 text-sm leading-[1.5] text-muted" key={achievement}>
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
