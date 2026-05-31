import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'jubfu9xb',
  dataset: 'production',
  apiVersion: '2026-01-01',
  useCdn: false,
  token: import.meta.env.SANITY_API_TOKEN,
})

// 👇 image helper
const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)