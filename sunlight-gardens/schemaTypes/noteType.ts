// optional but gives type helpers with ts files,, catching errors

import { defineField, defineType } from 'sanity'

// random blobs of text

// into:

// // structured “garden entries”
// Now every note has:

// title
// preview (excerpt)
// visual identity (image)
// categories (tags)
// body content
export const noteType = defineType({
  name: 'note',
  title: 'Note',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})