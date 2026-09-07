import { useId } from 'react'
import { tccCondicoes, tccModelos } from '../../content/tccContent'
import {
  Figura,
  FAINT,
  HatchDefs,
  INK,
  LINE,
  LINE_STRONG,
  MUTED,
  TabelaDados,
  barraDireita,
  milhar,
  segundos,
} from './chartKit'

const W = 780
const LABEL_END = 150
const ROWS_TOP = 76
const ROW_H = 40
const BAR_H = 12
const BAR_GAP = 3
const H = ROWS_TOP + tccCondicoes.length * ROW_H + 24

const PAINEL_TOKENS = { x0: 166, x1: 394, max: 3400 }
const PAINEL_LATENCIA = { x0: 470, x1: 698, max: 1.1 }

export default function FiguraCusto() {
  const uid = useId().replace(/:/g, '')
  const hatch = `hatch-custo-${uid}`

  const larguraTokens = (v: number) =>
    ((PAINEL_TOKENS.x1 - PAINEL_TOKENS.x0) * v) / PAINEL_TOKENS.max
  const larguraLatencia = (v: number) =>
    ((PAINEL_LATENCIA.x1 - PAINEL_LATENCIA.x0) * v) / PAINEL_LATENCIA.max

  return (
    <Figura
      numero="Figura 03"
      titulo="Recursos observados: tokens de entrada e latência HTTP"
      subtitulo="Dois painéis, duas escalas, nenhum eixo compartilhado — sobrepor as duas medidas num só plano inventaria uma correlação que os dados não têm. À esquerda, a média de tokens de entrada por chamada; à direita, a latência média da chamada HTTP de chat."
      legenda={[
        { tipo: 'solida', label: tccModelos.deepseek.label },
        { tipo: 'hachurada', label: tccModelos.gemma.label, hatchId: `${hatch}-legenda` },
      ]}
      nota="A latência cobre apenas a chamada HTTP de chat: não inclui geração de embeddings, busca local nem medição direta de uso de GPU. Por isso a redução de tokens não se traduz automaticamente em redução de custo — e o texto do trabalho não afirma que se traduz."
      tabela={
        <TabelaDados
          legendaTabela="Média de tokens de entrada e latência HTTP por condição e modelo."
          colunas={[
            { chave: 'condicao', label: 'Condição' },
            { chave: 'tokensDs', label: `Tokens · ${tccModelos.deepseek.label}`, alinhar: 'direita' },
            { chave: 'tokensGm', label: `Tokens · ${tccModelos.gemma.label}`, alinhar: 'direita' },
            { chave: 'latDs', label: `Latência · ${tccModelos.deepseek.label}`, alinhar: 'direita' },
            { chave: 'latGm', label: `Latência · ${tccModelos.gemma.label}`, alinhar: 'direita' },
          ]}
          linhas={tccCondicoes.map((c) => ({
            condicao: c.baseline ? `${c.label} (baseline)` : `${c.label} · ${c.nota}`,
            tokensDs: milhar(c.tokens.deepseek),
            tokensGm: milhar(c.tokens.gemma),
            latDs: segundos(c.latencia.deepseek),
            latGm: segundos(c.latencia.gemma),
          }))}
        />
      }
    >
      <div className="-mx-2 overflow-x-auto px-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[700px] max-w-[880px]"
          role="img"
          aria-label="Dois painéis de barras horizontais: tokens de entrada e latência HTTP por condição e modelo. Os valores estão na tabela abaixo do gráfico."
        >
          <HatchDefs id={hatch} />

          {[
            { p: PAINEL_TOKENS, titulo: 'Tokens de entrada', escala: 'escala 0 – 3.400' },
            { p: PAINEL_LATENCIA, titulo: 'Latência HTTP', escala: 'escala 0 – 1,10 s' },
          ].map((painel) => (
            <g key={painel.titulo}>
              <text
                x={painel.p.x0}
                y={26}
                fill="var(--color-ink-soft)"
                fontFamily="var(--font-mono)"
                fontSize="12.5"
              >
                {painel.titulo}
              </text>
              <text x={painel.p.x0} y={42} fill={FAINT} fontFamily="var(--font-mono)" fontSize="10">
                {painel.escala}
              </text>
              <line x1={painel.p.x0} y1={56} x2={painel.p.x1} y2={56} stroke={LINE} strokeWidth="1" />
              <line
                x1={painel.p.x0}
                y1={ROWS_TOP - 6}
                x2={painel.p.x0}
                y2={ROWS_TOP + tccCondicoes.length * ROW_H - 4}
                stroke={LINE_STRONG}
                strokeWidth="1"
              />
            </g>
          ))}

          {tccCondicoes.map((condicao, i) => {
            const topo = ROWS_TOP + i * ROW_H
            const yA = topo + 5
            const yB = yA + BAR_H + BAR_GAP
            const anterior = i > 0 ? tccCondicoes[i - 1] : null
            const trocaDeEixo = anterior !== null && anterior.eixo !== condicao.eixo

            return (
              <g key={condicao.id}>
                {trocaDeEixo && (
                  <line x1={0} y1={topo - 5} x2={W} y2={topo - 5} stroke={LINE} strokeWidth="1" />
                )}

                <text
                  x={LABEL_END}
                  y={topo + 14}
                  textAnchor="end"
                  fill="var(--color-ink-soft)"
                  fontFamily="var(--font-mono)"
                  fontSize="12"
                >
                  {condicao.label}
                </text>
                <text
                  x={LABEL_END}
                  y={topo + 27}
                  textAnchor="end"
                  fill={FAINT}
                  fontFamily="var(--font-mono)"
                  fontSize="9.5"
                >
                  {condicao.baseline ? 'baseline' : condicao.eixo.toLowerCase()}
                </text>

                {/* Tokens */}
                <path
                  d={barraDireita(PAINEL_TOKENS.x0, yA, larguraTokens(condicao.tokens.deepseek), BAR_H, 3)}
                  fill={INK}
                >
                  <title>{`${tccModelos.deepseek.label} · ${condicao.label}: ${milhar(condicao.tokens.deepseek)} tokens`}</title>
                </path>
                <text
                  x={PAINEL_TOKENS.x0 + larguraTokens(condicao.tokens.deepseek) + 8}
                  y={yA + BAR_H / 2}
                  dominantBaseline="middle"
                  fill={MUTED}
                  fontFamily="var(--font-mono)"
                  fontSize="10.5"
                >
                  {milhar(condicao.tokens.deepseek)}
                </text>

                <path
                  d={barraDireita(PAINEL_TOKENS.x0, yB, larguraTokens(condicao.tokens.gemma), BAR_H, 3)}
                  fill={`url(#${hatch})`}
                  stroke={MUTED}
                  strokeWidth="1"
                >
                  <title>{`${tccModelos.gemma.label} · ${condicao.label}: ${milhar(condicao.tokens.gemma)} tokens`}</title>
                </path>
                <text
                  x={PAINEL_TOKENS.x0 + larguraTokens(condicao.tokens.gemma) + 8}
                  y={yB + BAR_H / 2}
                  dominantBaseline="middle"
                  fill={MUTED}
                  fontFamily="var(--font-mono)"
                  fontSize="10.5"
                >
                  {milhar(condicao.tokens.gemma)}
                </text>

                {/* Latência */}
                <path
                  d={barraDireita(
                    PAINEL_LATENCIA.x0,
                    yA,
                    larguraLatencia(condicao.latencia.deepseek),
                    BAR_H,
                    3,
                  )}
                  fill={INK}
                >
                  <title>{`${tccModelos.deepseek.label} · ${condicao.label}: ${segundos(condicao.latencia.deepseek)}`}</title>
                </path>
                <text
                  x={PAINEL_LATENCIA.x0 + larguraLatencia(condicao.latencia.deepseek) + 8}
                  y={yA + BAR_H / 2}
                  dominantBaseline="middle"
                  fill={MUTED}
                  fontFamily="var(--font-mono)"
                  fontSize="10.5"
                >
                  {segundos(condicao.latencia.deepseek)}
                </text>

                <path
                  d={barraDireita(
                    PAINEL_LATENCIA.x0,
                    yB,
                    larguraLatencia(condicao.latencia.gemma),
                    BAR_H,
                    3,
                  )}
                  fill={`url(#${hatch})`}
                  stroke={MUTED}
                  strokeWidth="1"
                >
                  <title>{`${tccModelos.gemma.label} · ${condicao.label}: ${segundos(condicao.latencia.gemma)}`}</title>
                </path>
                <text
                  x={PAINEL_LATENCIA.x0 + larguraLatencia(condicao.latencia.gemma) + 8}
                  y={yB + BAR_H / 2}
                  dominantBaseline="middle"
                  fill={MUTED}
                  fontFamily="var(--font-mono)"
                  fontSize="10.5"
                >
                  {segundos(condicao.latencia.gemma)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </Figura>
  )
}
