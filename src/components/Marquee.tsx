import { useReveal } from '../hooks/useReveal'

const TECHS = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Docker',
  'AWS',
  'Next.js',
  'Git',
  'CI/CD',
]

export default function Marquee() {
  const strip = useReveal<HTMLDivElement>()

  // Duas trilhas idênticas = loop infinito sem emenda visível
  const track = (key: string, hidden: boolean) => (
    <div
      className="flex shrink-0 animate-marquee items-center gap-14 pr-14 group-hover:[animation-play-state:paused] max-[640px]:gap-8 max-[640px]:pr-8"
      key={key}
      aria-hidden={hidden}
    >
      {TECHS.map((tech) => (
        <span key={tech} className="flex items-center gap-14 max-[640px]:gap-8">
          {/* O contorno era branco a 35% (3.08:1) e caía para 24% no mobile
              (2.01:1) — a stack do site, ilegível. Agora usa --color-stroke,
              4.60:1 nos dois tamanhos, e o hue quente do sistema. */}
          <span className="whitespace-nowrap text-2xl font-extrabold uppercase tracking-[0.02em] text-transparent transition-colors duration-300 [-webkit-text-stroke:1px_var(--color-stroke)] [font-stretch:115%] hover:text-accent hover:[-webkit-text-stroke:1px_var(--color-accent)] max-[640px]:text-base">
            {tech}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent max-[640px]:h-1 max-[640px]:w-1" />
        </span>
      ))}
    </div>
  )

  return (
    <div
      className="reveal group flex select-none overflow-hidden border-y border-line bg-bg-soft py-[22px] max-[640px]:py-4"
      ref={strip}
    >
      {track('a', false)}
      {track('b', true)}
    </div>
  )
}
