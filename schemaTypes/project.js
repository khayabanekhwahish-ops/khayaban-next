import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (used in the page URL, e.g. rashan-2026)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category label (shown on the site)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'categoryKey',
      title: 'Category filter',
      type: 'string',
      options: {
        list: [
          { title: 'Food support', value: 'food' },
          { title: 'Community welfare', value: 'community' },
          { title: 'Child welfare', value: 'child' },
          { title: 'Fundraising', value: 'fundraising' },
          { title: 'Emergency relief', value: 'emergency' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'status', title: 'Status', type: 'string', initialValue: 'Completed' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'date', title: 'Date (free text, e.g. "Ramadan 2026")', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'image', title: 'Cover photo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery',
      title: 'Project gallery photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'summary', title: 'Short summary (card + intro text)', type: 'text' }),
    defineField({ name: 'objective', title: 'Objective', type: 'text' }),
    defineField({
      name: 'impact',
      title: 'What was achieved (bullet points)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'metrics',
      title: 'Impact snapshot figures',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'metric',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({ name: 'story', title: 'Full story', type: 'text' }),
    defineField({ name: 'funding', title: 'Funding / support line', type: 'string' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
