import { useReveal } from '../hooks/useReveal'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { tccMeta, tccNumeros } from '../content/tccContent'

/* Chamada compacta na home. O trabalho inteiro mora em /tcc/ — aqui fica só
   o suficiente para alguém decidir se quer entrar: o que é, o tamanho do
   experimento e uma frase do achado principal. */

export default function Tcc() {
  const section = useScrollProgress<HTMLElement>()
  const head = useReveal<HTMLDivElement>()
  const card = useReveal<HTMLAnchorElement>()

  return (
    <section className="relative overflow-hidden py-[clamp(72px,10vh,120px)]" id="tcc" ref={section}>
      <div className="wrap">
        <div
          className="reveal-head mb-[clamp(32px,5vh,52px)] flex items-baseline justify-between gap-6 max-[640px]:flex-col-reverse max-[640px]:items-start max-[640px]:gap-2"
          ref={head}
        >
          <h2 className="display-type -ml-[0.03em] text-[clamp(26px,5vw,64px)]">
            {tccMeta.titulo}
          </h2>
          <span className="shrink-0 whitespace-nowrap font-mono text-[13px] tracking-[0.2em] text-accent">
            {tccMeta.contador}
          </span>
        </div>

        <a
          ref={card}
          href="/tcc/"
          className="reveal group block border border-line bg-bg-soft p-[clamp(20px,3vw,40px)] transition-colors duration-[400ms] ease-out-expo hover:border-line-strong focus-visible:border-line-strong"
        >
          <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-[clamp(24px,4vw,56px)] max-[900px]:grid-cols-1">
            <div>
              <span className="label-mono mb-4 block text-faint">{tccMeta.programa}</span>
              <p className="max-w-[560px] text-[clamp(15px,1.7vw,19px)] leading-[1.45] text-ink-soft">
                Experimento controlado sobre agentes LLM: como o tamanho do toolset exposto, a
                estratégia de recuperação e o mecanismo de invocação afetam acurácia, alucinação e
                custo — em 18 condições e dois modelos self-hosted.
              </p>
              <p className="mt-4 max-w-[560px] text-[13.5px] leading-[1.6] text-muted">
                Resultados medidos, gráficos em preto e branco, o que os dados não sustentam e as
                pendências ainda abertas.
              </p>

              <span className="mt-7 inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em] text-ink">
                Ver o trabalho
                <span className="grid h-9 w-9 place-items-center rounded-full border border-line-strong transition-all duration-[350ms] ease-out-expo group-hover:border-accent group-hover:bg-accent group-hover:text-bg group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-bg">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-px self-start border border-line bg-line">
              {tccNumeros.map((item) => (
                <div className="bg-bg-soft px-4 py-4" key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <span className="block text-[clamp(20px,2.4vw,28px)] font-extrabold leading-none tracking-[-0.02em]">
                      {item.valor}
                    </span>
                    <span className="mt-2 block text-[11.5px] leading-tight text-muted">
                      {item.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </a>
      </div>
    </section>
  )
}
