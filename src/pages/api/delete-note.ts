// this is the endpoint for submitting the form in notes/[slug].astro to actually go get the slug that matches the id and gets
// rid of it from sanity aka the db

import { client } from '../../lib/sanity'

export async function POST({ request }) {
  const form = await request.formData()
  const id = form.get('id')

  await client.delete(id)

  return new Response(null, {
    status: 303,
    headers: {
      Location: '/'
    }
  })
}