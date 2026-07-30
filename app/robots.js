export const dynamic = 'force-static'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.khayabanekhwahish.org/sitemap.xml',
  }
}
