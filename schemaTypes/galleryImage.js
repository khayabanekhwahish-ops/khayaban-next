import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery image',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'alt', title: 'Alt text (describes the photo)', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'section',
      title: 'Where it appears',
      type: 'string',
      options: {
        list: [
          { title: 'Projects page — field photographs', value: 'projects-field' },
          { title: 'About page — team mini gallery', value: 'about-mini' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display order (lower shows first)',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'alt', subtitle: 'section', media: 'image' },
  },
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
