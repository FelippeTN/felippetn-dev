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
      className="flex shrink-0 animate-marquee items-center gap-14 pr-14 group-hover:[animation-play-state:paused]"
      key={key}
      aria-hidden={hidden}
    >
      {TECHS.map((tech) => (
        <span key={tech} className="flex items-center gap-14">
          <span className="whitespace-nowrap text-2xl font-extrabold uppercase tracking-[0.02em] text-transparent transition-colors duration-300 [-webkit-text-stroke:1px_rgba(255,255,255,0.35)] [font-stretch:115%] hover:text-accent hover:[-webkit-text-stroke:1px_var(--color-accent)]">
            {tech}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        </span>
      ))}
    </div>
  )

  return (
    <div
      className="reveal group flex select-none overflow-hidden border-y border-line bg-bg-soft py-[22px]"
      ref={strip}
    >
      {track('a', false)}
      {track('b', true)}
    </div>
  )
}
