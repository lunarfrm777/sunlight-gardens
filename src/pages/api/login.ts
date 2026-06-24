export const prerender = false

export async function POST({ request, cookies }) {
  const form = await request.formData()
  const password = form.get("password")

  if (password !== (import.meta as any).env.ADMIN_PASSWORD) {
    return new Response("Wrong password", { status: 401 })
  }

  cookies.set("auth", (import.meta as any).env.ADMIN_PASSWORD, {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  return new Response(null, {
    status: 303,
    headers: { Location: "/create" },
  })
}