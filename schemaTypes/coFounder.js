import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'coFounder',
  title: 'Co-Founder',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'role', title: 'Role line', type: 'string' }),
    defineField({
      name: 'photo',
      title: 'Photo (leave empty to show a placeholder avatar)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio paragraphs',
      description: 'Each entry becomes one paragraph.',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'qualities',
      title: 'Leadership qualities (short tags)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
