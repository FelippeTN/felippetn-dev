import { useLayoutEffect, useRef } from 'react'

/**
 * Adiciona a classe "in" quando o elemento entra na viewport.
 * Uso: <div ref={useReveal()} className="reveal">...</div>
 *
 * O ocultamento é *armado por este hook*, não pelo CSS sozinho: só
 * `.reveal.reveal-armed` fica invisível. Um elemento que tenha a classe
 * `reveal` mas esqueça o `ref` nunca é armado e portanto continua legível —
 * foi exatamente esse esquecimento que deixou cinco parágrafos invisíveis no
 * site publicado. O CSS não consegue detectar um ref faltando; o hook sim.
 *
 * `useLayoutEffect` porque a classe precisa entrar antes do primeiro paint,
 * senão o conteúdo pisca visível e some.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') return

    el.classList.add('reveal-armed')

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
