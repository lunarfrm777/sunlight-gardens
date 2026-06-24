// this is the endpoint for submitting the form in notes/[slug].astro to actually go get the slug that matches the id and gets
// rid of it from sanity aka the db

import { client } from '../../lib/sanity'

export async function POST({ request }) {
    console.log("TOKEN:", (import.meta as any).env.SANITY_API_TOKEN)
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