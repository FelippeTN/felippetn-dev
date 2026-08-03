import { useEffect, useRef } from 'react'
import { subscribeToScroll } from '../lib/scrollScheduler'

/**
 * Desloca o elemento conforme a posição dele na viewport (parallax).
 * speedX/speedY controlam direção e intensidade (ex.: 0.08 = sutil).
 * Uso: <span ref={useParallax(0.08)} className="inline-block">...</span>
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speedX = 0,
  speedY = 0,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let curX = 0
    let curY = 0

    return subscribeToScroll({
      read() {
        const rect = el.getBoundingClientRect()
        // Distância do centro do elemento ao centro da viewport,
        // descontando o deslocamento já aplicado (evita feedback).
        const center = rect.top - curY + rect.height / 2 - window.innerHeight / 2
        curX = -center * speedX
        curY = -center * speedY
      },
      write() {
        el.style.transform = `translate3d(${curX.toFixed(1)}px, ${curY.toFixed(1)}px, 0)`
      },
    })
  }, [speedX, speedY])

  return ref
}
