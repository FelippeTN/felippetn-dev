import { tccModelos, tccSensibilidade } from '../../content/tccContent'
import {
  Figura,
  FAINT,
  INK,
  LINE,
  LINE_STRONG,
  MUTED,
  SURFACE,
  TabelaDados,
  deltaPp,
  pct,
} from './chartKit'

const W = 780
const LABEL_END = 168
const PLOT_X0 = 190
const PLOT_X1 = 700
const DOM_MIN = 0.55
const DOM_MAX = 0.9
const K = (PLOT_X1 - PLOT_X0) / (DOM_MAX - DOM_MIN)
const ROWS_TOP = 96
const ROW_H = 58
const H = ROWS_TOP + tccSensibilidade.linhas.length * ROW_H + 66

const x = (valor: number) => PLOT_X0 + (valor - DOM_MIN) * K

export default function FiguraSensibilidade() {
  const baseX = x(tccSensibilidade.baseline)
  const fimLinhas = ROWS_TOP + tccSensibilidade.linhas.length * ROW_H

  return (
    <Figura
      numero="Figura 04"
      titulo="O que acontece quando o critério de acerto fica mais exigente"
      subtitulo={`Nas consultas sem ferramenta aplicável, a ausência de chamada contava como acerto mesmo quando vinha de uma falha de parsing. O gráfico compara a métrica original com a métrica ajustada — acerto × (1 − erro de parsing) — no ${tccModelos.gemma.label}.`}
      legenda={[
        { tipo: 'vazada', label: 'Métrica original' },
        { tipo: 'preenchida', label: 'Exigindo resposta sem falha de parsing' },
      ]}
      nota={`Foram ${tccSensibilidade.falhasParsing} falhas de parsing no ${tccModelos.gemma.label}, das quais ${tccSensibilidade.falhasContadasComoAcerto} também apareciam como acerto (34 em code_action, 26 em json_prompt). No ${tccModelos.deepseek.label} não houve nenhuma falha de parsing nas 2.880 execuções, e os resultados ficam idênticos sob os dois critérios. Os registros e a métrica primária do experimento não foram alterados: esta é uma análise de sensibilidade, não uma troca de resultado.`}
      tabela={
        <TabelaDados
          legendaTabela="Acurácia sob a métrica original e sob a métrica que exige resposta sem falha de parsing."
          colunas={[
            { chave: 'condicao', label: 'Condição (Gemma)' },
            { chave: 'original', label: 'Acurácia original', alinhar: 'direita' },
            { chave: 'ajustada', label: 'Sem falha de parsing', alinhar: 'direita' },
            { chave: 'erro', label: 'Taxa de erro de parsing', alinhar: 'direita' },
            { chave: 'delta', label: 'Δ vs. baseline (ajustada)', alinhar: 'direita' },
          ]}
          linhas={tccSensibilidade.linhas.map((linha) => ({
            condicao: linha.label,
            original: pct(linha.original),
            ajustada: pct(linha.ajustada),
            erro: pct(linha.erroParsing),
            delta: `${deltaPp(linha.deltaAjustado)} p.p.`,
          }))}
        />
      }
    >
      <div className="-mx-2 overflow-x-auto px-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[640px] max-w-[880px]"
          role="img"
          aria-label="Gráfico de deslocamento mostrando, para três condições do Gemma, a acurácia sob a métrica original e sob a métrica ajustada. Os valores estão na tabela abaixo do gráfico."
        >
          {/* Referência: o baseline nativo do próprio modelo */}
          <line x1={baseX} y1={70} x2={baseX} y2={fimLinhas + 4} stroke={LINE_STRONG} strokeWidth="1" />
          <text
            x={baseX}
            y={60}
            textAnchor="middle"
            fill={FAINT}
            fontFamily="var(--font-mono)"
            fontSize="10"
          >
            {`baseline nativo · ${pct(tccSensibilidade.baseline)}`}
          </text>

          <line x1={PLOT_X0} y1={fimLinhas + 4} x2={PLOT_X1} y2={fimLinhas + 4} stroke={LINE} strokeWidth="1" />
          {[0.6, 0.7, 0.8, 0.9].map((tick) => (
            <text
              key={tick}
              x={x(tick)}
              y={fimLinhas + 24}
              textAnchor="middle"
              fill={FAINT}
              fontFamily="var(--font-mono)"
              fontSize="10"
            >
              {pct(tick, 0)}
            </text>
          ))}

          {tccSensibilidade.linhas.map((linha, i) => {
            const topo = ROWS_TOP + i * ROW_H
            const y = topo + 22
            const xOriginal = x(linha.original)
            const xAjustada = x(linha.ajustada)
            const mudou = Math.abs(linha.original - linha.ajustada) > 0.0005

            return (
              <g key={linha.id}>
                <text
                  x={LABEL_END}
                  y={topo + 18}
                  textAnchor="end"
                  fill="var(--color-ink-soft)"
                  fontFamily="var(--font-mono)"
                  fontSize="12.5"
                >
                  {linha.label}
                </text>
                <text
                  x={LABEL_END}
                  y={topo + 32}
                  textAnchor="end"
                  fill={FAINT}
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                >
                  {linha.erroParsing > 0 ? `${pct(linha.erroParsing)} de falha de parsing` : 'sem falha de parsing'}
                </text>

                {mudou && (
                  <line
                    x1={xAjustada}
                    y1={y}
                    x2={xOriginal}
                    y2={y}
                    stroke={MUTED}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}

                <circle cx={xOriginal} cy={y} r="6" fill={SURFACE} stroke={MUTED} strokeWidth="1.8">
                  <title>{`${linha.label} · métrica original: ${pct(linha.original)}`}</title>
                </circle>
                <circle cx={xAjustada} cy={y} r="6" fill={INK} stroke={SURFACE} strokeWidth="2">
                  <title>{`${linha.label} · exigindo resposta sem falha de parsing: ${pct(linha.ajustada)}`}</title>
                </circle>

                {mudou ? (
                  <>
                    <text
                      x={xAjustada - 14}
                      y={y}
                      dominantBaseline="middle"
                      textAnchor="end"
                      fill="var(--color-ink-soft)"
                      fontFamily="var(--font-mono)"
                      fontSize="11.5"
                    >
                      {pct(linha.ajustada)}
                    </text>
                    <text
                      x={xOriginal + 14}
                      y={y}
                      dominantBaseline="middle"
                      fill={MUTED}
                      fontFamily="var(--font-mono)"
                      fontSize="11.5"
                    >
                      {pct(linha.original)}
                    </text>
                    <text
                      x={(xOriginal + xAjustada) / 2}
                      y={y + 24}
                      textAnchor="middle"
                      fill={FAINT}
                      fontFamily="var(--font-mono)"
                      fontSize="10.5"
                    >
                      {`${deltaPp((linha.ajustada - linha.original) * 100)} p.p. sob o critério mais exigente`}
                    </text>
                  </>
                ) : (
                  <text
                    x={xAjustada + 14}
                    y={y}
                    dominantBaseline="middle"
                    fill={MUTED}
                    fontFamily="var(--font-mono)"
                    fontSize="11.5"
                  >
                    {`${pct(linha.ajustada)} · inalterado`}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </Figura>
  )
}
