/**
 * Agendador único de scroll.
 *
 * Antes, cada hook registrava o próprio listener + requestAnimationFrame e
 * fazia leitura (getBoundingClientRect) seguida de escrita (style). Com uma
 * dúzia deles no mesmo frame, a escrita de um sujava o layout que o próximo
 * ia ler — forçando recálculo repetido dentro do mesmo frame (layout thrashing).
 *
 * Aqui há um listener e um rAF para a página inteira, e o frame roda em duas
 * fases: todas as leituras primeiro, todas as escritas depois. O layout é
 * recalculado no máximo uma vez por frame, independente do número de inscritos.
 */

export type ScrollSubscriber = {
  /** Só lê layout. Nunca escreve. */
  read: () => void
  /** Só escreve. Nunca lê layout. */
  write: () => void
}

const subscribers = new Set<ScrollSubscriber>()
let frame = 0

function flush() {
  frame = 0
  for (const subscriber of subscribers) subscriber.read()
  for (const subscriber of subscribers) subscriber.write()
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(flush)
}

export function subscribeToScroll(subscriber: ScrollSubscriber) {
  if (subscribers.size === 0) {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
  }

  subscribers.add(subscriber)
  schedule()

  return () => {
    subscribers.delete(subscriber)
    if (subscribers.size > 0) return

    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    if (frame) {
      cancelAnimationFrame(frame)
      frame = 0
    }
  }
}
