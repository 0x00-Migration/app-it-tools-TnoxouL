import { existsSync, statSync } from 'node:fs'
import { dirname, extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', 'web')

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
}

export default {
  fetch(request: Request): Response {
    const { pathname } = new URL(request.url)
    const decoded = decodeURIComponent(pathname)
    const asked = extname(decoded) ? decoded : '/index.html'
    const file = normalize(join(root, asked))
    if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
      return new Response('not found', { status: 404 })
    }
    return new Response(Bun.file(file), { headers: { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' } })
  },
}
