import { useEffect, useRef } from 'react'

/**
 * Efeito magnético: o elemento é atraído na direção do cursor enquanto ele
 * está por perto, voltando suavemente ao lugar ao sair. `strength` controla
 * a intensidade da atração (0.2–0.5 funciona bem).
 *
 * Ignorado em telas sem hover (touch) e com `prefers-reduced-motion: reduce`.
 */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(strength = 0.35) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    let raf = 0
    let curX = 0
    let curY = 0
    let tgtX = 0
    let tgtY = 0

    const render = () => {
      raf = 0
      curX += (tgtX - curX) * 0.18
      curY += (tgtY - curY) * 0.18

      if (Math.abs(tgtX - curX) < 0.05 && Math.abs(tgtY - curY) < 0.05) {
        if (tgtX === 0 && tgtY === 0) {
          el.style.transform = ''
          return
        }
      }
      el.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(render)
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render)
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tgtX = (e.clientX - (r.left + r.width / 2)) * strength
      tgtY = (e.clientY - (r.top + r.height / 2)) * strength
      kick()
    }

    const onLeave = () => {
      tgtX = 0
      tgtY = 0
      kick()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [strength])

  return ref
}
