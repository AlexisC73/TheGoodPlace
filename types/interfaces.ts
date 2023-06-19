export interface User {
  id?: string | null
  name?: string | null
  email?: string | null
  access_token?: string | null
  role?: string | null
  avatarUrl?: string | null
}

export interface Book {
  id: string
  title: string
  author: string
  price: number
  imageUrl: string
  publicationDate: string
  description: string
  createdAt: string
  published: boolean
  seller: string
}
