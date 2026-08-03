/**
 * Gera as variantes responsivas de imagem servidas pelo site.
 *
 * Os arquivos originais (masters) ficam versionados onde sempre estiveram e
 * nunca são alterados; a saída vai para `public/img/`, referenciada por
 * caminho absoluto nos componentes.
 *
 * Roda sozinho no `prebuild` e é idempotente: se a variante já existe e é mais
 * nova que o master, pula. Para forçar a regeração completa: `--force`.
 *
 * Uso: node scripts/images.mjs [--force]
 */

import fs from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'img')
const force = process.argv.includes('--force')

/**
 * `alpha` decide o formato de fallback: recorte transparente não pode virar
 * JPEG. As larguras cobrem 1x e 2x do tamanho em que cada imagem aparece —
 * gerar mais que isso só desperdiça banda no srcset.
 */
const SOURCES = [
  {
    name: 'hero',
    from: 'public/felippetn-computador.png',
    widths: [640, 900, 1080],
    alpha: true,
  },
  {
    name: 'retrato',
    from: 'src/assets/Felippe.jpg',
    widths: [400, 600, 785],
    alpha: true,
  },
  {
    name: 'fastapi',
    from: 'src/assets/fastapi.jpeg',
    widths: [320, 440, 640],
    alpha: false,
  },
]

const isStale = (target, master) =>
  force || !existsSync(target) || statSync(target).mtimeMs < statSync(master).mtimeMs

async function build() {
  await fs.mkdir(outDir, { recursive: true })

  let written = 0
  let skipped = 0
  let bytes = 0

  for (const source of SOURCES) {
    const master = path.join(root, source.from)
    const meta = await sharp(master).metadata()

    for (const width of source.widths) {
      if (width > meta.width) {
        console.warn(`  aviso: ${source.name}-${width} excede o master (${meta.width}px), ignorado`)
        continue
      }

      const fallback = source.alpha ? 'png' : 'jpg'
      const variants = [
        ['avif', (p) => p.avif({ quality: 52, effort: 6 })],
        ['webp', (p) => p.webp({ quality: 80 })],
        [
          fallback,
          (p) =>
            source.alpha
              ? p.png({ compressionLevel: 9, palette: true, quality: 82 })
              : p.jpeg({ quality: 78, mozjpeg: true }),
        ],
      ]

      for (const [ext, encode] of variants) {
        const target = path.join(outDir, `${source.name}-${width}.${ext}`)

        if (!isStale(target, master)) {
          skipped++
          bytes += statSync(target).size
          continue
        }

        const pipeline = sharp(master).resize({ width, withoutEnlargement: true })
        await encode(pipeline).toFile(target)
        written++
        bytes += statSync(target).size
      }
    }
  }

  console.log(
    `imagens: ${written} geradas, ${skipped} reaproveitadas — ${(bytes / 1024).toFixed(0)}KB em public/img/`,
  )
}

build().catch((error) => {
  console.error('falha ao gerar imagens:', error)
  process.exit(1)
})
