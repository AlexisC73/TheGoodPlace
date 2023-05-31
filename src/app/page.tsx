import BookCard from '@/components/BookCard'

const imageLink =
  'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1212&q=80'

const bookInfo = {
  id: 1,
  title: 'The Midnight Library',
  author: 'Matt Haig',
  publishedDate: new Date('2020-09-29'),
  price: 12.99,
  note: 4.5,
  imageUrl: imageLink,
}

export default function Home() {
  return (
    <main>
      <BookCard bookInfo={bookInfo} />
    </main>
  )
}
