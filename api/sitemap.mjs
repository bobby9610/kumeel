export default function handler(req, res) {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (!host || !/^[a-z0-9.-]+$/i.test(host)) return res.status(503).end()
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600')
  return res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://${host}/</loc></url></urlset>`)
}
