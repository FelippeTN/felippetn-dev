import { useEffect, useRef } from 'react'

/**
 * Skew cinético dirigido pela velocidade do scroll: o elemento "entorta"
 * sutilmente conforme a página rola rápido e volta ao normal ao parar —
 * efeito elástico comum em sites premiados (Awwwards).
 *
 * O loop só roda enquanto há scroll, parando quando assenta. Ignorado com
 * `prefers-reduced-motion: reduce`.
 */
export function useScrollSkew<T extends HTMLElement = HTMLDivElement>(
  intensity = 0.22,
  maxSkew = 3,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let running = false
    let lastY = window.scrollY
    let cur = 0

    const loop = () => {
      const y = window.scrollY
      const delta = y - lastY
      lastY = y

      const target = Math.max(-maxSkew, Math.min(maxSkew, delta * intensity))
      cur += (target - cur) * 0.12

      if (Math.abs(cur) < 0.01 && Math.abs(delta) < 0.5) {
        cur = 0
        el.style.transform = ''
        running = false
        raf = 0
        return
      }

      el.style.transform = `skewY(${cur.toFixed(3)}deg)`
      raf = requestAnimationFrame(loop)
    }

    const kick = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }

    window.addEventListener('scroll', kick, { passive: true })

    return () => {
      window.removeEventListener('scroll', kick)
      if (raf) cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [intensity, maxSkew])

  return ref
}
