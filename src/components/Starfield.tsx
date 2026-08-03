import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  depth: number // 0 = longe, 1 = perto — controla tamanho, velocidade e parallax
  phase: number
  ember: boolean // brasas laranja no meio das estrelas brancas
}

/**
 * Campo de partículas 3D em canvas: deriva lenta pra cima (estilo
 * cinzas do Nether), profundidade com parallax de mouse e twinkle.
 */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Cores vindas do @theme: o canvas passa a obedecer o mesmo sistema que o
    // resto da página. As estrelas eram #f0f0f5 — hue 286°, azulado — a única
    // nota fria num design inteiramente quente.
    const theme = getComputedStyle(document.documentElement)
    const token = (name: string, fallback: string) =>
      theme.getPropertyValue(name).trim() || fallback
    const STAR = token('--color-star', '#f0eeea')
    const EMBER_HOT = token('--color-ember-hot', '#ff8c50')
    const EMBER_WARM = token('--color-ember-warm', '#ff6e32')

    /** Aplica alpha a um hex do tema, no formato que o canvas espera. */
    const withAlpha = (hex: string, alpha: number) => {
      const h = hex.replace('#', '')
      const n = parseInt(
        h.length === 3
          ? h
              .split('')
              .map((c) => c + c)
              .join('')
          : h,
        16,
      )
      return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
    }

    let w = 0
    let h = 0
    let particles: Particle[] = []
    let raf = 0
    let visible = true
    let last = 0
    const mouse = { x: 0, y: 0 } // -0.5..0.5
    const parallax = { x: 0, y: 0 }

    const spawn = () => {
      const count = Math.min(70, Math.floor((w * h) / 24000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        depth: 0.15 + Math.random() ** 1.6 * 0.85, // mais partículas longe que perto
        phase: Math.random() * Math.PI * 2,
        ember: Math.random() < 0.25,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      spawn()
    }

    const draw = (time: number, dt: number) => {
      ctx.clearRect(0, 0, w, h)

      // parallax suave em direção ao mouse
      parallax.x += (mouse.x - parallax.x) * 0.035
      parallax.y += (mouse.y - parallax.y) * 0.035

      for (const p of particles) {
        const d = p.depth

        // deriva lenta pra cima, mais rápida quanto mais perto
        p.y -= (5 + d * 16) * dt
        if (p.y < -12) {
          p.y = h + 12
          p.x = Math.random() * w
        }

        // balanço lateral senoidal + parallax proporcional à profundidade
        const sx = p.x + Math.sin(time * 0.35 + p.phase) * 14 * d + parallax.x * 60 * d
        const sy = p.y + parallax.y * 36 * d

        const twinkle = 0.55 + 0.45 * Math.sin(time * 1.3 + p.phase * 3)
        const alpha = (0.12 + 0.6 * d) * twinkle
        const size = 0.4 + d * 1.5

        if (p.ember) {
          // halo quente atrás da brasa
          ctx.beginPath()
          ctx.fillStyle = withAlpha(EMBER_WARM, alpha * 0.18)
          ctx.arc(sx, sy, size * 3.4, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.fillStyle = withAlpha(EMBER_HOT, alpha)
          ctx.arc(sx, sy, size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.fillStyle = withAlpha(STAR, alpha)
          ctx.arc(sx, sy, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const tick = (t: number) => {
      const time = t / 1000
      const dt = Math.min(time - last, 0.05) // clamp evita salto ao voltar de aba inativa
      last = time

      // Fora de tela o loop para de verdade, em vez de agendar frames vazios.
      if (!visible) {
        raf = 0
        return
      }

      draw(time, dt)
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (raf) return
      raf = requestAnimationFrame((t) => {
        last = t / 1000
        tick(t)
      })
    }

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5
      mouse.y = e.clientY / window.innerHeight - 0.5
    }

    resize()

    if (reduced) {
      // sem animação: um frame estático
      draw(0, 0)
      window.addEventListener('resize', resize)
      return () => window.removeEventListener('resize', resize)
    }

    // pausa quando o hero sai da tela, retoma quando volta
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    observer.observe(canvas)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse, { passive: true })
    start()

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-[3] block h-full w-full"
      aria-hidden="true"
    />
  )
}
