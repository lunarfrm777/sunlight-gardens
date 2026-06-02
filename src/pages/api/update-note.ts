import { client } from '../../lib/sanity'

export async function POST({ request }) {
  const form = await request.formData()

  const id = form.get('id')
  const title = form.get('title')
  const content = form.get('content')
  const image = form.get('image')

  // 1. handle image upload (optional)
  let imageRef = null

 if (image && image.size > 0) {
  const arrayBuffer = await image.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const uploaded = await client.assets.upload('image', buffer, {
    filename: image.name,
    contentType: image.type,
  })

  imageRef = uploaded._id
}
  // 2. build update object
  const updateData = {
    title,
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: content
          }
        ]
      }
    ],
    ...(imageRef && {
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageRef
        }
      }
    })
  }

  // 3. patch document in Sanity
  await client
    .patch(id)
    .set(updateData)
    .commit()

  // 4. redirect back
  return new Response(null, {
    status: 303,
    headers: {
      Location: `/`
    }
  })
}