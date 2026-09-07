import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'
import Footer from '../components/Footer'
import FiguraAcuracia from '../components/tcc/FiguraAcuracia'
import FiguraEfeitos from '../components/tcc/FiguraEfeitos'
import FiguraCusto from '../components/tcc/FiguraCusto'
import FiguraSensibilidade from '../components/tcc/FiguraSensibilidade'
import {
  tccAchados,
  tccCondicoes,
  tccDesenho,
  tccLimites,
  tccMeta,
  tccModelos,
  tccNaoSustenta,
  tccNumeros,
  tccValidacao,
  type ValidacaoStatus,
} from '../content/tccContent'

/* ============================================================
   Página dedicada do TCC (/tcc/)

   Página própria, não seção: o trabalho tem densidade de artigo e estava
   engolindo a home. Aqui a escala tipográfica é deliberadamente menor que a
   do portfólio — a home é vitrine e pode ser grande; esta página é leitura,
   e leitura pede coluna estreita, corpo pequeno e muita margem.

   Entrada própria no Vite (tcc/index.html), sem router e sem dependência
   nova: uma URL real, indexável, que funciona em qualquer host estático.
   ============================================================ */

const GRUPOS_VALIDACAO: Array<{ chave: ValidacaoStatus; titulo: string; descricao: string }> = [
  {
    chave: 'orientador',
    titulo: 'Depende do orientador',
    descricao: 'Decisões de escopo e de definição operacional que não são minhas para fechar sozinho.',
  },
  {
    chave: 'metodo',
    titulo: 'Método e instrumento',
    descricao: 'O que ainda falta para o instrumento sustentar o peso que os resultados pedem.',
  },
  {
    chave: 'redacao',
    titulo: 'Redação e norma',
    descricao: 'Pendências de texto, formatação e honestidade de afirmação.',
  },
]

/** Coluna de leitura: estreita de propósito. */
const COLUNA = 'mx-auto w-full max-w-[960px]'

function Secao({
  rotulo,
  titulo,
  descricao,
  children,
}: {
  rotulo: string
  titulo: string
  descricao?: string
  children: ReactNode
}) {
  const bloco = useReveal<HTMLElement>()

  return (
    <section className="mb-[clamp(48px,7vh,72px)]" ref={bloco}>
      <div className="mb-6 border-t border-line pt-5">
        <span className="label-mono block text-accent">{rotulo}</span>
        <h2 className="mt-3 text-[clamp(17px,2vw,22px)] font-extrabold uppercase leading-[1.15] tracking-[-0.01em] [font-stretch:112%]">
          {titulo}
        </h2>
        {descricao ? (
          <p className="mt-2.5 max-w-[620px] text-[12.5px] leading-[1.65] text-muted">{descricao}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export default function TccPage() {
  const hero = useReveal<HTMLDivElement>()

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      {/* Cabeçalho enxuto: esta página não repete a navegação do portfólio,
          só oferece a volta. Um menu completo aqui competiria com o texto. */}
      <header
        id="top"
        className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-[14px]"
      >
        <div className={`${COLUNA} flex items-center justify-between gap-4 px-5 py-3`}>
          <a
            href="/"
            className="group inline-flex items-center gap-3 text-ink"
            aria-label="Voltar ao portfólio de Felippe Toscano Nalim"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent group-focus-visible:border-accent">
              <img src="/code.svg" alt="" className="h-4 w-4 invert" draggable={false} />
            </span>
            <span className="leading-none">
              <span className="block text-[12px] font-bold tracking-[0.08em]">Felippe TN</span>
              <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted">
                Software Engineer
              </span>
            </span>
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink focus-visible:border-line-strong focus-visible:text-ink"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Portfólio
          </a>
        </div>
      </header>

      <main id="conteudo" className="px-5 pb-[clamp(56px,8vh,88px)] pt-[clamp(40px,6vh,64px)]">
        <div className={COLUNA}>
          {/* ---- Abertura ---- */}
          <div className="reveal mb-[clamp(44px,6vh,64px)]" ref={hero}>
            <span className="label-mono mb-4 block text-faint">Trabalho de conclusão</span>
            <h1 className="max-w-[860px] text-[clamp(23px,3.2vw,36px)] font-extrabold uppercase leading-[1.05] tracking-[-0.015em] [font-stretch:114%]">
              {tccMeta.titulo}
            </h1>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="tag">{tccMeta.programa}</span>
              <span className="tag">{tccMeta.status}</span>
            </div>

            <div className="mt-8 grid grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-[clamp(24px,4vw,48px)] max-[860px]:grid-cols-1">
              <p className="text-[13.5px] leading-[1.7] text-muted">
                {tccMeta.resumo}
              </p>

              <div className="border-l border-line pl-6 max-[860px]:border-l-0 max-[860px]:pl-0">
                <span className="label-mono mb-3 block text-faint">Pergunta de pesquisa</span>
                <p className="text-[12.5px] leading-[1.65] text-ink-soft">{tccMeta.pergunta}</p>
                <span className="label-mono mb-2 mt-6 block text-faint">Título provisório</span>
                <p className="text-[12.5px] leading-[1.6] text-muted">“{tccMeta.tituloProvisorio}”</p>
              </div>
            </div>

            {/* Números */}
            <div className="mt-9 grid grid-cols-4 gap-px border border-line bg-line max-[680px]:grid-cols-2">
              {tccNumeros.map((item) => (
                <div className="bg-bg-soft px-4 py-4" key={item.label}>
                  <span className="block text-[clamp(18px,2.2vw,25px)] font-extrabold leading-none tracking-[-0.02em]">
                    {item.valor}
                  </span>
                  <span className="mt-2 block text-[11px] leading-tight text-ink-soft">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] leading-tight text-faint">
                    {item.nota}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Desenho ---- */}
          <Secao
            rotulo="01 — Método"
            titulo="Desenho do experimento"
            descricao="OFAT em torno de um baseline, com o piso aleatório e a separação entre falha de recuperação e falha de decisão embutidos no instrumento."
          >
            <div className="reveal-stagger grid grid-cols-3 gap-px border border-line bg-line max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
              {tccDesenho.map((item) => (
                <div className="bg-bg-soft p-5" key={item.titulo}>
                  <h3 className="mb-2 text-[12.5px] font-bold leading-tight">{item.titulo}</h3>
                  <p className="text-[11.5px] leading-[1.6] text-muted">{item.texto}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-[820px] font-mono text-[10.5px] leading-[1.75] text-faint">
              Modelos: {tccModelos.deepseek.detalhe} e {tccModelos.gemma.detalhe}, ambos self-hosted em
              endpoints OpenAI-compatíveis. Embeddings: qwen3-embedding-8B, 4096 dimensões. Corpus de 52
              ferramentas sintéticas em 4 domínios, com 8 pares confusáveis declarados; os toolsets são
              aninhados (10 ⊂ 30 ⊂ 50) e determinísticos, o que torna a comparação de fato pareada.
            </p>
          </Secao>

          {/* ---- Figuras ---- */}
          <Secao
            rotulo="02 — Resultados"
            titulo="O que foi medido"
            descricao="Quatro figuras em preto e branco: a identidade das séries vem de textura e rótulo, não de cor, e cada uma traz a tabela equivalente."
          >
            <div className="grid gap-[clamp(18px,2.5vw,28px)]">
              <FiguraAcuracia />
              <FiguraEfeitos />
              <FiguraCusto />
              <FiguraSensibilidade />
            </div>
            <p className="mt-4 max-w-[820px] font-mono text-[10.5px] leading-[1.75] text-faint">
              Fonte de todas as figuras: {tccMeta.fonte} Dado primário em{' '}
              <span className="text-muted">results/raw_results.csv</span>, com SHA-256, hash de cada
              script e semente de permutação registrados em{' '}
              <span className="text-muted">docs/data/audit.json</span>.
            </p>
          </Secao>

          {/* ---- Achados ---- */}
          <Secao rotulo="03 — Leitura" titulo="O que os dados mostram">
            <div className="reveal-stagger grid grid-cols-2 gap-x-[clamp(24px,3vw,44px)] gap-y-7 max-[820px]:grid-cols-1">
              {tccAchados.map((achado, i) => (
                <article className="border-t border-line pt-4" key={achado.titulo}>
                  <span className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mb-2 text-[13px] font-bold leading-[1.3] tracking-[-0.005em]">
                    {achado.titulo}
                  </h3>
                  <p className="text-[12px] leading-[1.65] text-muted">{achado.texto}</p>
                </article>
              ))}
            </div>
          </Secao>

          {/* ---- O que os dados não sustentam ---- */}
          <Secao
            rotulo="04 — Limites"
            titulo="O que os dados não sustentam"
            descricao="Metade do trabalho de um experimento é resistir à frase mais vendável que ele quase permite."
          >
            <div className="reveal-stagger flex flex-col border-t border-line">
              {tccNaoSustenta.map((item) => (
                <div
                  className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-[clamp(16px,3vw,40px)] border-b border-line py-4 max-[720px]:grid-cols-1 max-[720px]:gap-1.5"
                  key={item.afirmacao}
                >
                  <p className="font-mono text-[12px] leading-[1.55] text-faint line-through decoration-line-strong">
                    {item.afirmacao}
                  </p>
                  <p className="text-[12.5px] leading-[1.6] text-ink-soft">{item.correcao}</p>
                </div>
              ))}
            </div>

            <ul className="mt-7 grid grid-cols-2 gap-x-[clamp(24px,3vw,44px)] gap-y-2.5 max-[820px]:grid-cols-1">
              {tccLimites.map((limite) => (
                <li className="flex gap-2.5 text-[12px] leading-[1.6] text-muted" key={limite}>
                  <span aria-hidden="true" className="mt-[8px] h-px w-3.5 shrink-0 bg-line-strong" />
                  <span>{limite}</span>
                </li>
              ))}
            </ul>
          </Secao>

          {/* ---- Em validação ---- */}
          <Secao
            rotulo="05 — Em aberto"
            titulo="O que ainda precisa ser validado"
            descricao="A coleta terminou; o trabalho não. Estas são as pendências abertas hoje — deliberadamente visíveis, porque um resultado publicado antes de passar por elas vale menos do que parece."
          >
            <div className="flex flex-col gap-8">
              {GRUPOS_VALIDACAO.map((grupo) => {
                const itens = tccValidacao.filter((item) => item.status === grupo.chave)
                return (
                  <div
                    className="grid grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)] gap-[clamp(20px,3vw,48px)] border-t border-line pt-5 max-[820px]:grid-cols-1 max-[820px]:gap-3"
                    key={grupo.chave}
                  >
                    <div>
                      <h3 className="text-[14px] font-extrabold uppercase leading-[1.15] tracking-[0.02em]">
                        {grupo.titulo}
                      </h3>
                      <p className="mt-2 max-w-[280px] text-[11.5px] leading-[1.6] text-faint">
                        {grupo.descricao}
                      </p>
                      <span className="mt-3 inline-block font-mono text-[10px] tracking-[0.2em] text-faint">
                        {String(itens.length).padStart(2, '0')} pendências
                      </span>
                    </div>

                    <ul className="flex flex-col gap-4">
                      {itens.map((item) => (
                        <li className="flex gap-3" key={item.titulo}>
                          <span
                            aria-hidden="true"
                            className="mt-[6px] h-[11px] w-[11px] shrink-0 rounded-sm border border-line-strong"
                          />
                          <div className="min-w-0">
                            <h4 className="text-[12.5px] font-bold leading-[1.35]">{item.titulo}</h4>
                            <p className="mt-1 max-w-[600px] text-[11.5px] leading-[1.65] text-muted">
                              {item.texto}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <p className="mt-9 max-w-[780px] border-l border-line pl-4 text-[12px] leading-[1.7] text-faint">
              Estado atual: as {tccCondicoes.length * 2} condições foram executadas de ponta a ponta e a
              análise reroda do zero a partir do dado primário versionado. O que falta é revisão
              independente, intervalo de confiança e o aval do orientador sobre duas decisões de escopo —
              nenhuma delas altera os números acima, todas alteram o quanto se pode afirmar a partir
              deles.
            </p>
          </Secao>
        </div>
      </main>

      <Footer />
    </>
  )
}
