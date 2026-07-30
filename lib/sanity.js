import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = createImageUrlBuilder(client)
export function urlFor(source) {
  return builder.image(source)
}

const PROJECT_FIELDS = `
  _id, title, "slug": slug.current, category, categoryKey, status, location, date, year,
  image, gallery, summary, objective, impact, metrics, story, funding
`

// Sanity isn't configured yet (no real project) until scripts/migrate-to-sanity.mjs
// has been run once against a real project. Fail soft so the rest of the site can
// still be built/previewed before that one-time setup step happens.
async function safeFetch(query, params, fallback) {
  if (!projectId || projectId === 'placeholder') return fallback
  try {
    return await client.fetch(query, params)
  } catch (err) {
    console.warn('[sanity] fetch failed, using fallback:', err.message)
    return fallback
  }
}

export async function getProjects() {
  return safeFetch(`*[_type == "project"] | order(_createdAt asc){${PROJECT_FIELDS}}`, {}, [])
}

export async function getProjectBySlug(slug) {
  return safeFetch(`*[_type == "project" && slug.current == $slug][0]{${PROJECT_FIELDS}}`, { slug }, null)
}

export async function getProjectSlugs() {
  return safeFetch(`*[_type == "project" && defined(slug.current)]{"slug": slug.current}`, {}, [])
}

export async function getSettings() {
  return safeFetch(
    `*[_type == "siteSettings"][0]{orgName, tagline, email, instagram, instagramUrl, metrics}`,
    {},
    null
  )
}

export async function getFounder() {
  return safeFetch(`*[_type == "founder"][0]{name, role, photo, bio, qualities}`, {}, null)
}

export async function getTeamMembers() {
  return safeFetch(`*[_type == "teamMember"] | order(order asc){name, role, photo, bio}`, {}, [])
}

export async function getGallery(section) {
  return safeFetch(
    `*[_type == "galleryImage" && section == $section] | order(order asc){image, alt}`,
    { section },
    []
  )
}
