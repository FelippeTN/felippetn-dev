import { useEffect, useRef } from 'react'

/**
 * Writes section progress CSS vars while an element crosses the viewport.
 * --scroll-progress goes from 0 to 1.
 * --scroll-reveal grows in the first half.
 * --scroll-exit grows in the second half.
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--scroll-progress', '1')
      el.style.setProperty('--scroll-reveal', '1')
      el.style.setProperty('--scroll-exit', '0')
      return
    }

    let raf = 0

    const clamp = (value: number) => Math.min(1, Math.max(0, value))

    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      const progress = clamp((viewport - rect.top) / (viewport + rect.height))
      const reveal = clamp(progress * 2)
      const exit = clamp((progress - 0.5) * 2)
      const center = progress - 0.5

      el.style.setProperty('--scroll-progress', progress.toFixed(4))
      el.style.setProperty('--scroll-reveal', reveal.toFixed(4))
      el.style.setProperty('--scroll-exit', exit.toFixed(4))
      el.style.setProperty('--scroll-opacity', (0.82 + reveal * 0.18).toFixed(4))
      el.style.setProperty('--scroll-shift-sm', `${(center * 80).toFixed(2)}px`)
      el.style.setProperty('--scroll-shift-md', `${(center * 140).toFixed(2)}px`)
      el.style.setProperty('--scroll-shift-md-neg', `${(center * -140).toFixed(2)}px`)
      el.style.setProperty('--scroll-shift-lg', `${(center * 220).toFixed(2)}px`)
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
  }, [])

  return ref
}
