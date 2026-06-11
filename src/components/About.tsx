import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const STATS = [
  { value: 3, suffix: '+', label: 'Anos de experiência' },
  { value: 20, suffix: '+', label: 'Projetos entregues' },
  { value: 10, suffix: '+', label: 'Tecnologias dominadas' },
]

/* Número que conta de 0 até o valor quando entra na viewport */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    let raf = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const duration = 1400
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 4)
          setDisplay(Math.round(eased * value))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return <span ref={ref}>{display}</span>
}

export default function About() {
  const head = useReveal<HTMLDivElement>()
  const text = useReveal<HTMLDivElement>()
  const stats = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden py-[clamp(96px,14vh,160px)]" id="sobre">
      <div className="wrap">
        <div
          className="reveal-head mb-[clamp(48px,8vh,80px)] flex items-baseline justify-between gap-6"
          ref={head}
        >
          <h2 className="display-type -ml-[0.03em] text-[clamp(40px,6vw,88px)]">Sobre</h2>
          <span className="font-mono text-[13px] tracking-[0.2em] text-accent">/ 01</span>
        </div>

        <div className="grid grid-cols-[1.4fr_1fr] items-start gap-[clamp(40px,6vw,96px)] max-[860px]:grid-cols-1">
          <div
            className="reveal reveal-left text-[clamp(20px,2.4vw,28px)] font-medium leading-[1.45] tracking-[-0.01em] text-muted [&_em]:not-italic [&_em]:text-accent [&_strong]:font-semibold [&_strong]:text-ink [&_p+p]:mt-[1.2em]"
            ref={text}
          >
            <p>
              Sou engenheiro de software focado em construir <strong>produtos digitais
              de alta performance</strong> — do backend à interface, com atenção
              obsessiva aos detalhes.
            </p>
            <p>
              Trabalho principalmente com <em>React</em>, <em>TypeScript</em> e{' '}
              <em>Node.js</em>, transformando problemas complexos em soluções
              simples, escaláveis e <strong>agradáveis de usar</strong>.
            </p>
          </div>

          <div
            className="reveal reveal-right grid gap-px border border-line bg-line [--reveal-delay:0.15s]"
            ref={stats}
          >
            {STATS.map((stat) => (
              <div
                className="bg-bg px-8 py-7 transition-colors duration-300 hover:bg-surface"
                key={stat.label}
              >
                <div className="text-[clamp(36px,4vw,56px)] font-extrabold leading-none text-ink [font-stretch:115%]">
                  <CountUp value={stat.value} />
                  <span className="text-accent">{stat.suffix}</span>
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
