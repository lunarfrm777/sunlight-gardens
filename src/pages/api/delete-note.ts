// this is the endpoint for submitting the form in notes/[slug].astro to actually go get the slug that matches the id and gets
// rid of it from sanity aka the db

await writeClient.delete(id)