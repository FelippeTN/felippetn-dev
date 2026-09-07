import { tccContrastes, tccModelos } from '../../content/tccContent'
import {
  Figura,
  FAINT,
  INK,
  LINE,
  LINE_STRONG,
  MUTED,
  SURFACE,
  TabelaDados,
  barraDireita,
  barraEsquerda,
  deltaPp,
  pHolm,
} from './chartKit'

const W = 780
const LABEL_END = 150
const PANEIS = [
  { chave: 'deepseek' as const, x0: 168, x1: 420, titulo: tccModelos.deepseek.label },
  { chave: 'gemma' as const, x0: 508, x1: 760, titulo: tccModelos.gemma.label },
]
const DOM_MIN = -52
const DOM_MAX = 26
const K = (PANEIS[0].x1 - PANEIS[0].x0) / (DOM_MAX - DOM_MIN)
const ROWS_TOP = 76
const ROW_H = 34
const BAR_H = 14
const LIMIAR = 5
const H = ROWS_TOP + tccContrastes.length * ROW_H + 48

const zeroDe = (x0: number) => x0 + Math.abs(DOM_MIN) * K

export default function FiguraEfeitos() {
  return (
    <Figura
      numero="Figura 02"
      titulo="Efeito de cada condição contra o baseline do próprio modelo"
      subtitulo="Diferença pareada em pontos percentuais, com as 5 repetições agregadas por consulta antes do teste. Cada contraste usa 64 pares e passa por permutação de troca de sinal com correção de Holm-Bonferroni numa família de 16 comparações."
      legenda={[
        { tipo: 'solida', label: 'Significativo após Holm (5%)' },
        { tipo: 'hachurada', label: 'Não significativo' },
      ]}
      nota="As duas hairlines claras de cada painel marcam o limiar de relevância prática de ±5 p.p.: um resultado só é tratado como acionável se for significativo e ultrapassar esse limiar. Ausência de significância não demonstra igualdade entre configurações — demonstra que este instrumento, com este N, não separou as duas."
      tabela={
        <TabelaDados
          legendaTabela="Diferença pareada contra o baseline, em pontos percentuais, e p ajustado por Holm-Bonferroni."
          colunas={[
            { chave: 'condicao', label: 'Condição' },
            { chave: 'deltaDs', label: `Δ ${tccModelos.deepseek.label}`, alinhar: 'direita' },
            { chave: 'pDs', label: 'p (Holm)', alinhar: 'direita' },
            { chave: 'deltaGm', label: `Δ ${tccModelos.gemma.label}`, alinhar: 'direita' },
            { chave: 'pGm', label: 'p (Holm)', alinhar: 'direita' },
          ]}
          linhas={tccContrastes.map((c) => ({
            condicao: `${c.label} · ${c.eixo}`,
            deltaDs: `${deltaPp(c.delta.deepseek)} p.p.`,
            pDs: pHolm(c.pHolm.deepseek).replace('p = ', '').replace('p < ', '< '),
            deltaGm: `${deltaPp(c.delta.gemma)} p.p.`,
            pGm: pHolm(c.pHolm.gemma).replace('p = ', '').replace('p < ', '< '),
          }))}
        />
      }
    >
      <div className="-mx-2 overflow-x-auto px-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[680px] max-w-[880px]"
          role="img"
          aria-label="Dois painéis de barras divergentes mostrando o efeito de cada condição sobre o baseline, em pontos percentuais, por modelo. Os valores e os p ajustados estão na tabela abaixo do gráfico."
        >
          {PANEIS.map((painel) => {
            const zero = zeroDe(painel.x0)
            const centro = (painel.x0 + painel.x1) / 2
            return (
              <g key={painel.chave}>
                <text
                  x={centro}
                  y={28}
                  textAnchor="middle"
                  fill="var(--color-ink-soft)"
                  fontFamily="var(--font-mono)"
                  fontSize="12.5"
                >
                  {painel.titulo}
                </text>
                <line x1={painel.x0} y1={44} x2={painel.x1} y2={44} stroke={LINE} strokeWidth="1" />

                {/* Limiar de relevância prática */}
                <line
                  x1={zero - LIMIAR * K}
                  y1={ROWS_TOP - 12}
                  x2={zero - LIMIAR * K}
                  y2={ROWS_TOP + tccContrastes.length * ROW_H + 2}
                  stroke={LINE}
                  strokeWidth="1"
                />
                <line
                  x1={zero + LIMIAR * K}
                  y1={ROWS_TOP - 12}
                  x2={zero + LIMIAR * K}
                  y2={ROWS_TOP + tccContrastes.length * ROW_H + 2}
                  stroke={LINE}
                  strokeWidth="1"
                />

                {/* Zero */}
                <line
                  x1={zero}
                  y1={ROWS_TOP - 12}
                  x2={zero}
                  y2={ROWS_TOP + tccContrastes.length * ROW_H + 2}
                  stroke={LINE_STRONG}
                  strokeWidth="1"
                />

                {[-50, 0, 25].map((tick) => (
                  <text
                    key={`${painel.chave}-tick-${tick}`}
                    x={zero + tick * K}
                    y={ROWS_TOP + tccContrastes.length * ROW_H + 22}
                    textAnchor="middle"
                    fill={FAINT}
                    fontFamily="var(--font-mono)"
                    fontSize="10"
                  >
                    {tick > 0 ? `+${tick}` : tick === 0 ? '0' : `−${Math.abs(tick)}`}
                  </text>
                ))}

                {tccContrastes.map((contraste, i) => {
                  const valor = contraste.delta[painel.chave]
                  const significativo = contraste.significativo[painel.chave]
                  const topo = ROWS_TOP + i * ROW_H
                  const y = topo + 10
                  /* Piso de 3 unidades: sem ele, um efeito de 0,3 p.p. some e a
                     ponta arredondada vira um glifo em vez de uma barra. */
                  const comprimento = Math.max(Math.abs(valor) * K, 3)
                  const raio = Math.min(4, comprimento / 2)
                  const positivo = valor >= 0
                  const ponta = positivo ? zero + comprimento : zero - comprimento
                  const dentro = Math.abs(valor) >= 25
                  const rotulo = `${deltaPp(valor)}`

                  return (
                    <g key={`${painel.chave}-${contraste.id}`}>
                      <path
                        d={
                          positivo
                            ? barraDireita(zero, y, comprimento, BAR_H, raio)
                            : barraEsquerda(zero, y, comprimento, BAR_H, raio)
                        }
                        fill={significativo ? INK : 'transparent'}
                        stroke={significativo ? 'none' : MUTED}
                        strokeWidth="1.2"
                      >
                        <title>
                          {`${painel.titulo} · ${contraste.label}: ${deltaPp(valor)} p.p., ${pHolm(
                            contraste.pHolm[painel.chave],
                          )}${significativo ? ', significativo após Holm' : ', não significativo'}`}
                        </title>
                      </path>

                      <text
                        x={dentro ? ponta + 10 : positivo ? ponta + 8 : ponta - 8}
                        y={y + BAR_H / 2}
                        dominantBaseline="middle"
                        textAnchor={dentro ? 'start' : positivo ? 'start' : 'end'}
                        fill={dentro ? SURFACE : MUTED}
                        fontFamily="var(--font-mono)"
                        fontSize="11"
                      >
                        {rotulo}
                      </text>
                    </g>
                  )
                })}
              </g>
            )
          })}

          {/* Rótulos das linhas: uma vez só, servindo aos dois painéis */}
          {tccContrastes.map((contraste, i) => {
            const topo = ROWS_TOP + i * ROW_H
            return (
              <g key={`label-${contraste.id}`}>
                <text
                  x={LABEL_END}
                  y={topo + 15}
                  textAnchor="end"
                  fill="var(--color-ink-soft)"
                  fontFamily="var(--font-mono)"
                  fontSize="12.5"
                >
                  {contraste.label}
                </text>
                <text
                  x={LABEL_END}
                  y={topo + 28}
                  textAnchor="end"
                  fill={FAINT}
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                >
                  {contraste.eixo.toLowerCase()}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </Figura>
  )
}
