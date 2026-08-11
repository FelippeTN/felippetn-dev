import { useEffect, useRef } from 'react'

/** Brilho quente e sutil que segue o cursor. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // O CSS já esconde o brilho nesses casos; sem estas guardas o loop
    // continuava rodando a 60fps animando um elemento invisível — inclusive
    // no celular, onde só custava bateria.
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const tick = () => {
      x += (tx - x) * 0.08
      y += (ty - y) * 0.08
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`

      // Assentou no alvo: encerra o loop e espera o próximo movimento.
      if (Math.abs(tx - x) < 0.5 && Math.abs(ty - y) < 0.5) {
        raf = 0
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!raf) raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[1] -ml-[280px] -mt-[280px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,var(--color-accent-bloom)_0%,transparent_70%)] motion-reduce:hidden [@media(hover:none)]:hidden"
      aria-hidden="true"
    />
  )
}
