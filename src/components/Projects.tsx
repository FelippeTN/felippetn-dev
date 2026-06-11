import { useReveal } from '../hooks/useReveal'
import { useScrollSkew } from '../hooks/useScrollSkew'
import { pt as content } from '../content/siteContent'

const { projects } = content

const ArrowIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Projects() {
  const head = useReveal<HTMLDivElement>()
  const list = useReveal<HTMLDivElement>()
  const skew = useScrollSkew<HTMLDivElement>()

  return (
    <section className="relative py-[clamp(96px,14vh,160px)]" id="projetos">
      <div className="wrap">
        <div
          className="reveal-head mb-[clamp(48px,8vh,80px)] flex items-baseline justify-between gap-6"
          ref={head}
        >
          <h2 className="display-type -ml-[0.03em] text-[clamp(40px,6vw,88px)]">{projects.title}</h2>
          <span className="font-mono text-[13px] tracking-[0.2em] text-accent">/ 05</span>
        </div>

        <p className="reveal mb-[clamp(40px,6vh,64px)] max-w-[680px] text-[clamp(16px,1.8vw,20px)] leading-[1.55] text-muted">
          {projects.description}
        </p>

        <div ref={skew} className="will-change-transform">
        <div className="reveal-stagger flex flex-col border-t border-line" ref={list}>
          {projects.items.map((project, i) => (
            <a
              className="group relative grid grid-cols-[64px_1fr_auto] items-center gap-[clamp(16px,3vw,56px)] overflow-hidden border-b border-line py-[clamp(32px,5vh,56px)] pl-2 pr-2 transition-all duration-[450ms] ease-out-expo hover:bg-bg-soft hover:pl-6 hover:pr-6 max-[760px]:grid-cols-[1fr_auto] max-[760px]:gap-5"
              key={project.title}
              href={`https://${project.url}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="font-mono text-[14px] text-muted transition-colors duration-300 group-hover:text-accent max-[760px]:hidden">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="min-w-0">
                <h3 className="text-[clamp(26px,4vw,52px)] font-extrabold uppercase leading-[1.02] tracking-[-0.01em] transition-transform duration-[450ms] ease-out-expo [font-stretch:112%] group-hover:translate-x-2">
                  {project.title}
                </h3>

                <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[13px] tracking-[0.04em] text-accent">
                  {project.url}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                <p className="mt-4 max-w-[620px] text-[15px] leading-[1.6] text-muted">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span className="grid h-14 w-14 shrink-0 place-items-center self-start rounded-full border border-line text-muted transition-all duration-[400ms] ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                {ArrowIcon}
              </span>
            </a>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
