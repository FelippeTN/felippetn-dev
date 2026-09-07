import type { ReactNode } from 'react'

/* ============================================================
   Kit de gráficos da seção TCC

   Preto e branco por decisão, não por limitação: o site inteiro roda numa
   escala neutra e um gráfico colorido seria o único corpo estranho da página.
   Sem matiz, a identidade das séries precisa de outro canal — aqui é textura
   (hachura a 45°) somada à legenda e ao rótulo direto, que é exatamente o
   caminho recomendado para leitura em impressão monocromática, daltonismo
   severo e modo de alto contraste do sistema.

   Nada de biblioteca de charting: são quatro figuras com geometria conhecida,
   e SVG inline evita ~40 kB de dependência, mantém o texto selecionável e
   herda os tokens de cor do design system.
   ============================================================ */

export const INK = 'var(--color-ink)'
export const MUTED = 'var(--color-muted)'
export const FAINT = 'var(--color-faint)'
export const LINE = 'var(--color-line)'
export const LINE_STRONG = 'var(--color-line-strong)'
export const SURFACE = 'var(--color-bg)'

/** Percentual com uma casa e vírgula decimal: 0.8219 → "82,2%" */
export function pct(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits).replace('.', ',')}%`
}

/** Ponto percentual assinado: 20.94 → "+20,9" */
export function deltaPp(value: number, digits = 1): string {
  const fixed = Math.abs(value).toFixed(digits).replace('.', ',')
  if (Math.abs(value) < 0.05) return `0,0`
  return `${value > 0 ? '+' : '−'}${fixed}`
}

/** Milhar com ponto: 3333.3 → "3.333" */
export function milhar(value: number): string {
  return Math.round(value).toLocaleString('pt-BR')
}

/** Segundos com duas casas: 1.0003 → "1,00 s" */
export function segundos(value: number): string {
  return `${value.toFixed(2).replace('.', ',')} s`
}

/** p ajustado, com piso de exibição para não fingir precisão que não existe. */
export function pHolm(value: number): string {
  if (value >= 0.999) return 'p = 1,000'
  if (value < 0.001) return 'p < 0,001'
  return `p = ${value.toFixed(4).replace('.', ',')}`
}

/**
 * Barra com a ponta arredondada e a base reta. O raio nunca passa de metade
 * da largura da barra: numa barra curtíssima, um raio fixo viraria uma pílula
 * e exageraria visualmente o valor.
 */
export function barraDireita(x: number, y: number, w: number, h: number, r = 4): string {
  const raio = Math.max(0, Math.min(r, w, h / 2))
  if (w <= 0) return ''
  return [
    `M ${x} ${y}`,
    `H ${x + w - raio}`,
    `A ${raio} ${raio} 0 0 1 ${x + w} ${y + raio}`,
    `V ${y + h - raio}`,
    `A ${raio} ${raio} 0 0 1 ${x + w - raio} ${y + h}`,
    `H ${x}`,
    'Z',
  ].join(' ')
}

/** Espelho da anterior, para as barras que crescem para a esquerda do zero. */
export function barraEsquerda(x: number, y: number, w: number, h: number, r = 4): string {
  const raio = Math.max(0, Math.min(r, w, h / 2))
  if (w <= 0) return ''
  return [
    `M ${x} ${y}`,
    `H ${x - w + raio}`,
    `A ${raio} ${raio} 0 0 0 ${x - w} ${y + raio}`,
    `V ${y + h - raio}`,
    `A ${raio} ${raio} 0 0 0 ${x - w + raio} ${y + h}`,
    `H ${x}`,
    'Z',
  ].join(' ')
}

/**
 * Hachura a 45°. O ângulo é fixo de propósito: horizontal ou vertical seria
 * confundido com grade e com as próprias barras.
 */
export function HatchDefs({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="6" height="6" fill="transparent" />
        <line x1="0" y1="0" x2="0" y2="6" stroke={MUTED} strokeWidth="2.2" />
      </pattern>
    </defs>
  )
}

type ChaveTipo = 'solida' | 'hachurada' | 'vazada' | 'preenchida'

export type ItemLegenda = {
  tipo: ChaveTipo
  label: string
  hatchId?: string
}

export function Legenda({ itens }: { itens: ItemLegenda[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {itens.map((item) => (
        <li className="flex items-center gap-2" key={item.label}>
          <svg width="16" height="10" viewBox="0 0 18 12" aria-hidden="true" className="shrink-0">
            {item.hatchId ? <HatchDefs id={item.hatchId} /> : null}
            {item.tipo === 'solida' && <rect width="18" height="12" rx="2" fill={INK} />}
            {item.tipo === 'hachurada' && (
              <rect
                x="0.5"
                y="0.5"
                width="17"
                height="11"
                rx="2"
                fill={item.hatchId ? `url(#${item.hatchId})` : 'transparent'}
                stroke={MUTED}
              />
            )}
            {item.tipo === 'preenchida' && <circle cx="9" cy="6" r="5" fill={INK} />}
            {item.tipo === 'vazada' && (
              <circle cx="9" cy="6" r="4.2" fill={SURFACE} stroke={MUTED} strokeWidth="1.6" />
            )}
          </svg>
          <span className="font-mono text-[10px] leading-tight tracking-[0.04em] text-muted">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  )
}

export type Coluna = { chave: string; label: string; alinhar?: 'esquerda' | 'direita' }

/**
 * Toda figura tem gêmea em tabela. Não é enfeite de acessibilidade: é o que
 * garante que nenhum valor exista *apenas* dentro de um desenho — leitor de
 * tela, impressão e conferência contra o CSV usam a mesma fonte.
 */
export function TabelaDados({
  colunas,
  linhas,
  legendaTabela,
}: {
  colunas: Coluna[]
  linhas: Array<Record<string, string>>
  legendaTabela: string
}) {
  return (
    <details className="group mt-5 border-t border-line pt-3">
      <summary className="cursor-pointer list-none font-mono text-[11px] uppercase tracking-[0.18em] text-faint transition-colors duration-200 hover:text-ink focus-visible:text-ink">
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-open:rotate-90"
          >
            ›
          </span>
          Ver dados em tabela
        </span>
      </summary>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] max-w-[880px] border-collapse text-left">
          <caption className="sr-only">{legendaTabela}</caption>
          <thead>
            <tr className="border-b border-line">
              {colunas.map((coluna) => (
                <th
                  key={coluna.chave}
                  scope="col"
                  className={`py-2 pr-4 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-faint ${
                    coluna.alinhar === 'direita' ? 'text-right' : 'text-left'
                  }`}
                >
                  {coluna.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((linha, i) => (
              <tr className="border-b border-line/60" key={`${linha[colunas[0].chave]}-${i}`}>
                {colunas.map((coluna, j) => (
                  <td
                    key={coluna.chave}
                    className={`py-1.5 pr-4 text-[11.5px] leading-snug ${
                      coluna.alinhar === 'direita'
                        ? 'text-right font-mono tabular-nums text-ink-soft'
                        : 'text-muted'
                    } ${j === 0 ? 'text-ink-soft' : ''}`}
                  >
                    {linha[coluna.chave]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}

export function Figura({
  numero,
  titulo,
  subtitulo,
  legenda,
  nota,
  tabela,
  children,
}: {
  numero: string
  titulo: string
  subtitulo: string
  legenda: ItemLegenda[]
  nota?: string
  tabela?: ReactNode
  children: ReactNode
}) {
  return (
    /* min-w-0: a figura é item de grid, e item de grid tem `min-width: auto` —
       sem isto o `min-w-[660px]` do SVG vira o mínimo do card e estoura a
       página inteira no celular, em vez de rolar dentro do próprio card. */
    <figure className="min-w-0 border border-line bg-bg-soft p-[clamp(16px,2vw,26px)]">
      <figcaption className="mb-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
          {numero}
        </span>
        <h4 className="mt-2 text-[clamp(15px,1.5vw,18px)] font-bold leading-[1.25] tracking-[-0.01em]">
          {titulo}
        </h4>
        <p className="mt-2 max-w-[640px] text-[12.5px] leading-[1.55] text-muted">{subtitulo}</p>
      </figcaption>

      <div className="mb-4">
        <Legenda itens={legenda} />
      </div>

      {children}

      {/* Abaixo de 768px nenhuma das quatro figuras cabe na largura sem
          encolher a tipografia do eixo a um tamanho ilegível: o gráfico rola
          dentro do card. O aviso existe porque rolagem horizontal aninhada é
          invisível sem barra — em desktop a figura cabe e o aviso some. */}
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint md:hidden">
        <span aria-hidden="true">→</span> role o gráfico para o lado
      </p>

      {nota ? (
        <p className="mt-4 max-w-[700px] border-l border-line pl-3.5 text-[11.5px] leading-[1.6] text-faint">
          {nota}
        </p>
      ) : null}

      {tabela}
    </figure>
  )
}
