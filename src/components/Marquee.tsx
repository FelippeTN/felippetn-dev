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
  // Duas trilhas idênticas = loop infinito sem emenda visível
  const track = (key: string, hidden: boolean) => (
    <div className="marquee__track" key={key} aria-hidden={hidden}>
      {TECHS.map((tech) => (
        <span key={tech} style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
          <span className="marquee__item">{tech}</span>
          <span className="marquee__dot" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee">
      {track('a', false)}
      {track('b', true)}
    </div>
  )
}
