import { getProjectSlugs } from '@/lib/sanity'

export const dynamic = 'force-static'

const BASE_URL = 'https://www.khayabanekhwahish.org'

export default async function sitemap() {
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/impact',
    '/donate',
    '/volunteer',
    '/suggestions',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }))

  const slugs = await getProjectSlugs()
  const projectRoutes = slugs.map((s) => ({
    url: `${BASE_URL}/projects/${s.slug}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...projectRoutes]
}
