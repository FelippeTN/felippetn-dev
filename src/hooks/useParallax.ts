import { useEffect, useRef } from 'react'

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

    let raf = 0
    let curX = 0
    let curY = 0

    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      // Distância do centro do elemento ao centro da viewport,
      // descontando o deslocamento já aplicado (evita feedback).
      const center = rect.top - curY + rect.height / 2 - window.innerHeight / 2
      curX = -center * speedX
      curY = -center * speedY
      el.style.transform = `translate3d(${curX.toFixed(1)}px, ${curY.toFixed(1)}px, 0)`
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speedX, speedY])

  return ref
}
