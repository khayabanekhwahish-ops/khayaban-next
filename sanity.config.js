import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Custom Studio navigation: groups content into clear sections instead of
// Sanity's default flat, alphabetical list of every document type. This is
// the screen a non-technical team member sees first at /studio.
const structure = (S) =>
  S.list()
    .title('Khayaban-e-Khwahish')
    .items([
      S.listItem()
        .title('Projects')
        .child(
          S.documentTypeList('project')
            .title('Projects — newest first')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
      S.divider(),
      S.listItem()
        .title('Founder')
        .child(S.document().schemaType('founder').documentId('founder')),
      S.listItem()
        .title('Co-Founder')
        .child(S.document().schemaType('coFounder').documentId('coFounder')),
      S.listItem()
        .title('Team members')
        .child(S.documentTypeList('teamMember').title('Team members')),
      S.divider(),
      S.listItem()
        .title('Site-wide impact statistics')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Gallery images')
        .child(S.documentTypeList('galleryImage').title('Gallery images')),
    ])

export default defineConfig({
  name: 'default',
  title: 'Khayaban-e-Khwahish',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
})