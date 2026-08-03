import { usePauseOffscreen } from '../hooks/usePauseOffscreen'

/* A faixa é a primeira leitura de stack depois do hero, então ela precisa dizer
   a mesma coisa que o resto da página: backend e IA aplicada primeiro. A lista
   anterior abria com React/Next.js/Git e deixava Go, FastAPI e toda a stack de
   IA de fora — tudo verdade, mas lido como full-stack genérico.
   Todos os itens saem de skills.categories em siteContent. */
const TECHS = [
  'Go',
  'Python',
  'FastAPI',
  'RAG',
  'LangChain',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'AWS',
  'TypeScript',
]

export default function Marquee() {
  /* Sem reveal de entrada: a faixa já chega em movimento, um fade-up por cima
     disso seria animação sobre animação. O slot de ref serve melhor para
     pausá-la quando sai da tela. */
  const strip = usePauseOffscreen<HTMLDivElement>()

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
      className="group flex select-none overflow-hidden border-y border-line bg-bg-soft py-[22px] max-[640px]:py-4"
      ref={strip}
    >
      {track('a', false)}
      {track('b', true)}
    </div>
  )
}
