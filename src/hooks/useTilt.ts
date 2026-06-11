import { useEffect, useRef } from 'react'

/**
 * Tilt 3D: o elemento inclina em perspectiva seguindo o cursor, com leve
 * "pop" de escala. Expõe `--gx`/`--gy` (posição do cursor em %) para um
 * reflexo (glare) opcional via CSS.
 *
 * Movimento interpolado (lerp) para suavidade. Ignorado em telas sem hover
 * (touch) e quando `prefers-reduced-motion: reduce`.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(opts?: {
  max?: number
  scale?: number
}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const max = opts?.max ?? 7
    const scale = opts?.scale ?? 1.02

    let raf = 0
    let curRx = 0
    let curRy = 0
    let curS = 1
    let tgtRx = 0
    let tgtRy = 0
    let tgtS = 1

    const render = () => {
      raf = 0
      curRx += (tgtRx - curRx) * 0.12
      curRy += (tgtRy - curRy) * 0.12
      curS += (tgtS - curS) * 0.12

      const settled =
        Math.abs(tgtRx - curRx) < 0.02 &&
        Math.abs(tgtRy - curRy) < 0.02 &&
        Math.abs(tgtS - curS) < 0.001

      if (settled && tgtRx === 0 && tgtRy === 0 && tgtS === 1) {
        el.style.transform = ''
        return
      }

      el.style.transform = `perspective(900px) rotateX(${curRx.toFixed(2)}deg) rotateY(${curRy.toFixed(2)}deg) scale(${curS.toFixed(3)})`
      if (!settled) raf = requestAnimationFrame(render)
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render)
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      tgtRy = (px - 0.5) * 2 * max
      tgtRx = -(py - 0.5) * 2 * max
      el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
      el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
      kick()
    }

    const onEnter = () => {
      tgtS = scale
      kick()
    }

    const onLeave = () => {
      tgtRx = 0
      tgtRy = 0
      tgtS = 1
      kick()
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [])

  return ref
}
