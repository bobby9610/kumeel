import { readFile } from 'node:fs/promises'
import { render, initialContent, validContent } from '../dist-ssr/entry-server.js'
const config = JSON.parse(await readFile(new URL('../src/supabase-config.json', import.meta.url), 'utf8'))
const template = await readFile(new URL('../dist/template.html', import.meta.url), 'utf8')
const safeJson = value => JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
export default async function handler(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) { res.setHeader('Allow', 'GET, HEAD'); return res.status(405).end() }
  let content = initialContent
  let fresh = false
  try {
    const response = await fetch(`${config.url}/rest/v1/kumeel_published?id=eq.main&select=content`, { headers: { apikey: config.publishableKey }, signal: AbortSignal.timeout(5000) })
    if (!response.ok) throw new Error(`Public content HTTP ${response.status}`)
    const rows = await response.json()
    if (!validContent(rows[0]?.content)) throw new Error('Invalid public content')
    content = rows[0].content
    fresh = true
  } catch { console.error('Public content unavailable; serving bundled content') }
  const markup = `<div id="root">${render(content)}</div><script type="application/json" id="kumeel-content">${safeJson(content)}</script>`
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL
  const canonical = host && /^[a-z0-9.-]+$/i.test(host) ? `<link rel="canonical" href="https://${host}/" /><meta property="og:url" content="https://${host}/" />` : ''
  const html = template.replace('<div id="root"></div>', () => markup).replace('</head>', () => `${canonical}</head>`)
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', fresh ? 'public, s-maxage=60, stale-while-revalidate=300' : 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  return res.status(200).send(req.method === 'HEAD' ? '' : html)
}
