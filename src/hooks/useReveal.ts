import { useEffect, useRef } from 'react'

/**
 * Adiciona a classe "in" quando o elemento entra na viewport.
 * Uso: <div ref={useReveal()} className="reveal">...</div>
 *
 * O conteúdo nasce em `opacity: 0` no CSS, então qualquer falha aqui deixaria
 * a seção invisível para sempre. Por isso as duas saídas de emergência abaixo:
 * sem IntersectionObserver, revela na hora; e o gatilho se adapta a elementos
 * mais altos que a viewport, que nunca atingiriam 15% de visibilidade.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('in')
      return
    }

    // Uma lista longa pode ocupar várias telas: nesse caso a fração visível
    // nunca chega a 0.15 e o reveal jamais dispararia.
    const tallerThanViewport = el.getBoundingClientRect().height > window.innerHeight * 0.85

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          observer.disconnect()
        }
      },
      {
        threshold: tallerThanViewport ? 0 : 0.15,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
