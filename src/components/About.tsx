import { useReveal } from '../hooks/useReveal'

const STATS = [
  { value: '3', suffix: '+', label: 'Anos de experiência' },
  { value: '20', suffix: '+', label: 'Projetos entregues' },
  { value: '10', suffix: '+', label: 'Tecnologias dominadas' },
]

export default function About() {
  const head = useReveal<HTMLDivElement>()
  const text = useReveal<HTMLDivElement>()
  const stats = useReveal<HTMLDivElement>()

  return (
    <section className="section" id="sobre">
      <div className="container">
        <div className="section__head reveal" ref={head}>
          <h2 className="section__title display">Sobre</h2>
          <span className="section__index">/ 01</span>
        </div>

        <div className="about__grid">
          <div className="about__text reveal" ref={text}>
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
            className="about__stats reveal"
            ref={stats}
            style={{ '--reveal-delay': '0.15s' } as React.CSSProperties}
          >
            {STATS.map((stat) => (
              <div className="stat" key={stat.label}>
                <div className="stat__value">
                  {stat.value}
                  <span>{stat.suffix}</span>
                </div>
                <div className="stat__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
