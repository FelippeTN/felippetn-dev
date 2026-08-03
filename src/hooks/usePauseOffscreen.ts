import { useEffect, useRef } from 'react'

/**
 * Pausa animações CSS enquanto o elemento está fora da tela.
 *
 * Um loop infinito continua compositando mesmo a milhares de pixels de
 * distância — a faixa de tecnologias, por exemplo, seguia rodando duas trilhas
 * de 1481px durante a página inteira. Nada disso é visível, tudo isso custa
 * frame budget em celular.
 *
 * Marca o elemento com `is-offscreen`; o CSS pausa ele e os descendentes.
 */
export function usePauseOffscreen<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => {
      el.classList.toggle('is-offscreen', !entry.isIntersecting)
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
