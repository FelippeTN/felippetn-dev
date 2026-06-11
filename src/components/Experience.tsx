import { useReveal } from '../hooks/useReveal'
import { pt as content } from './siteContent'

const { experience } = content

export default function Experience() {
  const head = useReveal<HTMLDivElement>()
  const list = useReveal<HTMLDivElement>()

  return (
    <section className="relative py-[clamp(96px,14vh,160px)]" id="experiencia">
      <div className="wrap">
        <div
          className="reveal-head mb-[clamp(48px,8vh,80px)] flex items-baseline justify-between gap-6"
          ref={head}
        >
          <h2 className="display-type -ml-[0.03em] text-[clamp(40px,6vw,88px)]">{experience.title}</h2>
          <span className="font-mono text-[13px] tracking-[0.2em] text-accent">/ 03</span>
        </div>

        <p className="reveal mb-[clamp(40px,6vh,64px)] max-w-[680px] text-[clamp(16px,1.8vw,20px)] leading-[1.55] text-muted">
          {experience.description}
        </p>

        <div className="reveal-stagger flex flex-col border-t border-line" ref={list}>
          {experience.items.map((item) => (
            <article
              className="group grid grid-cols-[220px_1fr] gap-[clamp(20px,4vw,64px)] border-b border-line py-[clamp(32px,5vh,56px)] transition-colors duration-300 hover:bg-bg-soft/40 max-[760px]:grid-cols-1 max-[760px]:gap-4"
              key={`${item.title}-${item.company}`}
            >
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
    </section>
  )
}
