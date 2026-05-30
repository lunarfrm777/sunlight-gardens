import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'jubfu9xb',
  dataset: 'production',
  apiVersion: '2026-01-01',
  useCdn: true,
})