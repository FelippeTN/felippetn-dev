import { useEffect, useRef } from 'react'
import { subscribeToScroll } from '../lib/scrollScheduler'

/**
 * Writes section progress CSS vars while an element crosses the viewport.
 * --scroll-progress goes from 0 to 1.
 * --scroll-reveal grows in the first half.
 *
 * Leitura e escrita passam pelo agendador compartilhado: oito seções usam
 * este hook, e separar as fases evita recalcular o layout uma vez por seção
 * a cada frame.
 *
 * Cada escrita de custom property invalida o estilo da subárvore, então a
 * lista abaixo é só o que algum seletor realmente consome. `--scroll-exit` e
 * `--scroll-shift-lg` foram removidos: nenhum componente os lia, e mesmo assim
 * custavam 16 escritas por frame.
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--scroll-progress', '1')
      el.style.setProperty('--scroll-reveal', '1')
      return
    }

    const clamp = (value: number) => Math.min(1, Math.max(0, value))

    // Medidos na fase de leitura, aplicados na de escrita.
    let progress = 0
    let reveal = 0
    let center = 0

    return subscribeToScroll({
      read() {
        const rect = el.getBoundingClientRect()
        const viewport = window.innerHeight || 1
        progress = clamp((viewport - rect.top) / (viewport + rect.height))
        reveal = clamp(progress * 2)
        center = progress - 0.5
      },
      write() {
        el.style.setProperty('--scroll-progress', progress.toFixed(4))
        el.style.setProperty('--scroll-reveal', reveal.toFixed(4))
        el.style.setProperty('--scroll-opacity', (0.82 + reveal * 0.18).toFixed(4))
        el.style.setProperty('--scroll-shift-sm', `${(center * 80).toFixed(2)}px`)
        el.style.setProperty('--scroll-shift-md', `${(center * 140).toFixed(2)}px`)
        el.style.setProperty('--scroll-shift-md-neg', `${(center * -140).toFixed(2)}px`)
      },
    })
  }, [])

  return ref
}
