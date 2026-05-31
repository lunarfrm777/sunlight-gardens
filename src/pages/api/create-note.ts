import { client } from '../../lib/sanity'

export async function POST({ request }) {
  const form = await request.formData()

  const title = form.get('title')
  const content = form.get('content')

  await client.create({
    _type: 'note',
    title,
    slug: {
      current: title.toLowerCase().replace(/\s+/g, '-'),
    },
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: content,
          },
        ],
      },
    ],
  })

  return new Response(null, {
    status: 303,
    headers: { Location: '/' },
  })
}