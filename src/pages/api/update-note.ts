
import { client } from '../../lib/sanity'

export async function POST({ request }) {
  const form = await request.formData()

  const id = form.get("id") as string
  const title = form.get("title") as string
  const rawContent = form.get("content") as string
  const rawImage = form.get("coverImage") as File | null

  const content = rawContent.split('\n').filter(Boolean).map(line => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2),
  children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: line }],
  markDefs: [],
  style: 'normal',
}))

 let imageRef: string | null = null
try {
  if (rawImage && (rawImage as File).size > 0) {
    const arrayBuffer = await (rawImage as File).arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const uploaded = await client.assets.upload("image", buffer, {
      filename: (rawImage as File).name,
      contentType: (rawImage as File).type,
    })
    imageRef = uploaded._id
  }
} catch (err) {
  console.error("IMAGE UPLOAD FAILED:", err)
}

console.log("PATCHING ID:", id)
console.log("IMAGE REF:", imageRef)

const result = await client
  .patch(id)
  .set({
    title: String(title),
    content,
    ...(imageRef
      ? {
          coverImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageRef,
            },
          },
        }
      : {}),
  })
  .commit()

console.log("PATCH RESULT:", result)

return new Response(null, {
  status: 303,
  headers: { Location: '/' },
})
}