import { useId } from 'react'
import { tccCondicoes, tccModelos, type Eixo } from '../../content/tccContent'
import {
  Figura,
  HatchDefs,
  INK,
  LINE,
  LINE_STRONG,
  MUTED,
  FAINT,
  TabelaDados,
  barraDireita,
  pct,
} from './chartKit'

/* Geometria em unidades do viewBox. O SVG escala junto com o card; em telas
   estreitas o container rola na horizontal em vez de espremer os rótulos. */
const W = 780
const LABEL_END = 164
const PLOT_X0 = 176
const PLOT_X1 = 690
const SPAN = PLOT_X1 - PLOT_X0
const ROW_H = 46
const HEADER_H = 30
const BAR_H = 13
const BAR_GAP = 4
const TOP = 14

const EIXOS: Eixo[] = ['Exposição', 'Recuperação', 'Invocação']

type Linha = {
  tipo: 'grupo' | 'condicao'
  y: number
  eixo: Eixo
  id?: string
}

function montarLinhas(): { linhas: Linha[]; altura: number } {
  const linhas: Linha[] = []
  let y = TOP

  for (const eixo of EIXOS) {
    linhas.push({ tipo: 'grupo', y, eixo })
    y += HEADER_H
    for (const condicao of tccCondicoes.filter((c) => c.eixo === eixo)) {
      linhas.push({ tipo: 'condicao', y, eixo, id: condicao.id })
      y += ROW_H
    }
  }

  return { linhas, altura: y + 14 }
}

export default function FiguraAcuracia() {
  const uid = useId().replace(/:/g, '')
  const hatch = `hatch-acuracia-${uid}`
  const { linhas, altura } = montarLinhas()

  const x = (valor: number) => PLOT_X0 + SPAN * valor

  return (
    <Figura
      numero="Figura 01"
      titulo="Acurácia de seleção por condição e modelo"
      subtitulo="Proporção de consultas em que o agente escolheu a ferramenta correta — ou se absteve corretamente, quando nenhuma se aplicava. 320 execuções por condição, 64 consultas, 5 repetições."
      legenda={[
        { tipo: 'solida', label: tccModelos.deepseek.label },
        { tipo: 'hachurada', label: tccModelos.gemma.label, hatchId: `${hatch}-legenda` },
      ]}
      nota="O baseline é o mesmo em todos os contrastes: 50 ferramentas expostas integralmente com invocação nativa. O braço random não é uma técnica candidata — é o piso que separa o ganho vindo da relevância do ganho vindo apenas de encurtar o prompt."
      tabela={
        <TabelaDados
          legendaTabela="Acurácia de seleção por condição experimental e modelo."
          colunas={[
            { chave: 'eixo', label: 'Eixo' },
            { chave: 'condicao', label: 'Condição' },
            { chave: 'deepseek', label: tccModelos.deepseek.label, alinhar: 'direita' },
            { chave: 'gemma', label: tccModelos.gemma.label, alinhar: 'direita' },
          ]}
          linhas={tccCondicoes.map((c) => ({
            eixo: c.eixo,
            condicao: c.baseline ? `${c.label} (baseline)` : `${c.label} · ${c.nota}`,
            deepseek: pct(c.acuracia.deepseek),
            gemma: pct(c.acuracia.gemma),
          }))}
        />
      }
    >
      <div className="-mx-2 overflow-x-auto px-2">
        <svg
          viewBox={`0 0 ${W} ${altura}`}
          className="h-auto w-full min-w-[660px] max-w-[880px]"
          role="img"
          aria-label="Gráfico de barras horizontais com a acurácia de nove condições experimentais em dois modelos. Os valores estão na tabela abaixo do gráfico."
        >
          <HatchDefs id={hatch} />

          {/* Eixo zero: hairline sólida, um passo acima da superfície. */}
          <line x1={PLOT_X0} y1={TOP} x2={PLOT_X0} y2={altura - 20} stroke={LINE_STRONG} strokeWidth="1" />

          {linhas.map((linha) => {
            if (linha.tipo === 'grupo') {
              const primeiro = linha.eixo === EIXOS[0]
              return (
                <g key={`grupo-${linha.eixo}`}>
                  {!primeiro && (
                    <line x1={0} y1={linha.y - 6} x2={W} y2={linha.y - 6} stroke={LINE} strokeWidth="1" />
                  )}
                  <text
                    x={LABEL_END}
                    y={linha.y + 18}
                    textAnchor="end"
                    fill={FAINT}
                    fontFamily="var(--font-mono)"
                    fontSize="10"
                    letterSpacing="1.6"
                    style={{ textTransform: 'uppercase' }}
                  >
                    {linha.eixo.toUpperCase()}
                  </text>
                </g>
              )
            }

            const condicao = tccCondicoes.find((c) => c.id === linha.id)
            if (!condicao) return null

            const yA = linha.y + 6
            const yB = yA + BAR_H + BAR_GAP
            const wA = SPAN * condicao.acuracia.deepseek
            const wB = SPAN * condicao.acuracia.gemma

            return (
              <g key={condicao.id}>
                <text
                  x={LABEL_END}
                  y={linha.y + 17}
                  textAnchor="end"
                  fill="var(--color-ink-soft)"
                  fontFamily="var(--font-mono)"
                  fontSize="12.5"
                >
                  {condicao.label}
                </text>
                <text
                  x={LABEL_END}
                  y={linha.y + 31}
                  textAnchor="end"
                  fill={FAINT}
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                >
                  {condicao.baseline ? `${condicao.nota} · baseline` : condicao.nota}
                </text>

                <path d={barraDireita(PLOT_X0, yA, wA, BAR_H)} fill={INK}>
                  <title>{`${tccModelos.deepseek.label} · ${condicao.label}: ${pct(condicao.acuracia.deepseek)}`}</title>
                </path>
                <text
                  x={x(condicao.acuracia.deepseek) + 9}
                  y={yA + BAR_H / 2}
                  dominantBaseline="middle"
                  fill={MUTED}
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                >
                  {pct(condicao.acuracia.deepseek)}
                </text>

                <path
                  d={barraDireita(PLOT_X0, yB, wB, BAR_H)}
                  fill={`url(#${hatch})`}
                  stroke={MUTED}
                  strokeWidth="1"
                >
                  <title>{`${tccModelos.gemma.label} · ${condicao.label}: ${pct(condicao.acuracia.gemma)}`}</title>
                </path>
                <text
                  x={x(condicao.acuracia.gemma) + 9}
                  y={yB + BAR_H / 2}
                  dominantBaseline="middle"
                  fill={MUTED}
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                >
                  {pct(condicao.acuracia.gemma)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </Figura>
  )
}
