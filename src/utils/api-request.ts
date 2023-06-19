export async function getPublishedBooks() {
  try {
    const request = await fetch(`http://localhost:3000/api/book`, {
      next: { revalidate: 10 },
    })
    const response = await request.json()
    if (request.ok) {
      return response.data
    } else {
      console.log(response.error)
      return null
    }
  } catch (err) {
    console.log(err)
  }
}
