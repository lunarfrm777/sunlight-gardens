await writeClient
  .patch(noteId)
  .set({
    title,
    content,
  })
  .commit()