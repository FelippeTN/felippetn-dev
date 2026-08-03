import { useEffect, useRef } from 'react'

/**
 * Transforma o scroll vertical em movimento horizontal (scroll lateral fixo),
 * com interpolação suave (lerp) para um deslize aveludado — o conteúdo
 * "persegue" o alvo com peso, em vez de saltar 1:1 com o scroll.
 *
 * A seção externa (`sectionRef`) recebe uma altura calculada para que o trecho
 * percorrido na vertical equivalha 1:1 ao deslocamento horizontal da trilha
 * interna (`trackRef`). Enquanto a seção está em tela, um wrapper `sticky`
 * mantém o conteúdo fixo e a trilha desliza para a esquerda — ou seja, ao rolar
 * para baixo, o conteúdo anda para o lado.
 *
 * Respeita `prefers-reduced-motion`: nesse caso o hook não faz nada e o layout
 * deve cair em uma versão estática (grade).
 */
export function useHorizontalScroll<
  S extends HTMLElement = HTMLElement,
  T extends HTMLElement = HTMLDivElement,
>(opts?: { tilt3d?: boolean }) {
  const sectionRef = useRef<S>(null)
  const trackRef = useRef<T>(null)
  const tilt3d = opts?.tilt3d ?? false

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Coverflow 3D: cada painel marcado com [data-tilt] gira em profundidade
    // conforme se afasta do centro da viewport.
    // Mede todos os painéis primeiro, escreve depois: intercalar
    // getBoundingClientRect com escrita de transform dentro do laço forçava
    // um recálculo de layout por painel, a cada frame.
    const panels: HTMLElement[] = []
    const depths: number[] = []

    const applyPanels = () => {
      if (!tilt3d) return
      const half = window.innerWidth / 2
      const children = track.children

      panels.length = 0
      depths.length = 0

      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement
        if (!child.hasAttribute('data-tilt')) continue
        const r = child.getBoundingClientRect()
        panels.push(child)
        depths.push(Math.max(-1, Math.min(1, (r.left + r.width / 2 - half) / half)))
      }

      for (let i = 0; i < panels.length; i++) {
        const d = depths[i]
        const ry = (-d * 16).toFixed(2)
        const tz = (-Math.abs(d) * 140).toFixed(1)
        panels[i].style.transform = `perspective(1400px) translateZ(${tz}px) rotateY(${ry}deg)`
        panels[i].style.opacity = (1 - Math.abs(d) * 0.45).toFixed(3)
      }
    }

    let raf = 0
    let running = false
    let current = 0 // posição renderizada (interpolada)

    // Fator de suavização: quanto menor, mais "pesado"/lento o deslize.
    const EASE = 0.085

    // Distância horizontal total que a trilha precisa percorrer.
    const travel = () => track.scrollWidth - window.innerWidth

    // Alvo atual com base na posição da seção na viewport.
    const target = () => {
      const distance = travel()
      if (distance <= 0) return { distance: 0, t: 0 }
      const rect = section.getBoundingClientRect()
      return { distance, t: Math.min(Math.max(-rect.top, 0), distance) }
    }

    const render = (distance: number) => {
      track.style.transform = `translate3d(${-current.toFixed(2)}px, 0, 0)`
      section.style.setProperty('--hp', distance > 0 ? (current / distance).toFixed(4) : '0')
      applyPanels()
    }

    const frame = () => {
      const { distance, t } = target()
      if (distance <= 0) {
        current = 0
        track.style.transform = ''
        section.style.setProperty('--hp', '0')
        running = false
        raf = 0
        return
      }
      current += (t - current) * EASE
      // Encaixa no alvo quando a diferença é imperceptível (evita loop infinito).
      if (Math.abs(t - current) < 0.25) {
        current = t
        render(distance)
        running = false
        raf = 0
        return
      }
      render(distance)
      raf = requestAnimationFrame(frame)
    }

    const kick = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(frame)
      }
    }

    // Define a altura da seção para casar scroll vertical ↔ deslocamento horizontal.
    const layout = () => {
      const distance = travel()
      section.style.height = distance > 0 ? `${window.innerHeight + distance}px` : ''
      // Sincroniza a posição instantaneamente no resize/load (sem animar a partir do zero).
      current = target().t
      render(distance)
    }

    layout()

    // Recalcula quando o conteúdo/tamanho da trilha muda (fontes, imagens, etc.).
    const ro = new ResizeObserver(layout)
    ro.observe(track)

    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', layout)

    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', layout)
      if (raf) cancelAnimationFrame(raf)
      section.style.height = ''
      track.style.transform = ''
      const children = track.children
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement
        child.style.transform = ''
        child.style.opacity = ''
      }
    }
  }, [tilt3d])

  return { sectionRef, trackRef }
}
