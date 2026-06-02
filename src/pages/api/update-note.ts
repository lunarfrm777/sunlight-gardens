import { client } from '../../lib/sanity'

export async function POST({ request }) {
  const form = await request.formData()
// guard rail
  // const adminKey = form.get("adminKey")

  // if (adminKey !== process.env.ADMIN_KEY) {
  //   return new Response("Unauthorized", { status: 401 })
  // }

  const id = form.get('id')
  const title = form.get('title')
  const content = form.get('content')
  const image = form.get('image')

  let imageRef = null

  if (image && image.size > 0) {
    const uploaded = await client.assets.upload('image', image)
    imageRef = uploaded._id
  }

  await client.patch(id).set({
    title,
    content: [
      {
        _type: "block",
        children: [{ _type: "span", text: content }]
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
  }).commit()

  return new Response(null, {
    status: 303,
    headers: { Location: '/notes' }
  })
}