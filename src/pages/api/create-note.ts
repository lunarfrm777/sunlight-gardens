export const prerender = false
import { client } from '../../lib/sanity'

// In Astro:

// <form> submissions → multipart/form-data or x-www-form-urlencoded
// fetch() JSON requests → application/json

// Your handler is written like:

// await request.formData()

// So it ONLY works with HTML forms.
export async function POST(context) {
  const { request } = context
  
  console.log(request.headers.get('content-type'))
    const form = await request.formData()

    const title = form.get('title')
    const content = form.get('content')
    const image = form.get('image') as File
    let imageRef = null
   if (image && image.size > 0) {
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploaded = await client.assets.upload(
    'image',
    buffer,
    {
      filename: image.name,
    }
  )

  imageRef = uploaded._id
}
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
    image: imageRef
        ? {
            _type: 'image',
            asset: {
            _type: 'reference',
            _ref: imageRef,
            },
        }
        : undefined,
    })
    return new Response(null, {
        status: 303,
        headers: { Location: '/' },
    })
}

// export async function POST({ request }) {
//   console.log("POST HIT")
//   console.log("content-type:", request.headers.get("content-type"))

//   return new Response("ok")
// }