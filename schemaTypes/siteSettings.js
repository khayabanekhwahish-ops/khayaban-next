import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'orgName', title: 'Organization name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'email', title: 'Contact email', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram handle (e.g. @khayabanekhwahish)', type: 'string' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({
      name: 'metrics',
      title: 'Site-wide impact statistics',
      description: 'Shown on the Home metric strip and the Impact page. The first four also appear as the Impact page hero mini-stats; add a Bar % to any figure that should also appear in the Impact page bar chart.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'metric',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({
              name: 'barPercent',
              title: 'Bar % (Impact page bar chart only, optional)',
              type: 'number',
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'orgName' },
  },
})
