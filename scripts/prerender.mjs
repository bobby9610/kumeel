import { createServer } from 'vite'
import { readFile, writeFile } from 'node:fs/promises'
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
 const { render } = await server.ssrLoadModule('/src/entry-server.tsx')
 const template = await readFile('dist/index.html', 'utf8')
 await writeFile('dist/template.html', template)
 await writeFile('dist/index.html', template.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
 console.log('Prerendered Arabic profile HTML successfully.')
} finally { await server.close() }
