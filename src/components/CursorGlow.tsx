import { useEffect, useRef } from 'react'

/** Brilho quente e sutil que segue o cursor. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const tick = () => {
      x += (tx - x) * 0.08
      y += (ty - y) * 0.08
      el.style.transform = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[1] -ml-[280px] -mt-[280px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.05)_0%,rgba(255,90,31,0.02)_35%,transparent_70%)] motion-reduce:hidden [@media(hover:none)]:hidden"
      aria-hidden="true"
    />
  )
}
