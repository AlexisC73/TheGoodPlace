import { Book } from '@/domain/catalog/entities/book'
import { BookStatus } from '@/domain/catalog/entities/bookStatus'

export const bookBuilder = ({
  author = 'Alice',
  title = 'Alice in Wonderland',
  cover = 'https://images-na.ssl-images-amazon.com/images/I/51ZU%2BCvkTyL._SX331_BO1,204,203,200_.jpg',
  createdAt = new Date('2023-07-20T13:00:00Z'),
  description = 'Test de description',
  id = 'test',
  price = 10,
  publicationDate = new Date('2021-07-20'),
  seller = 'seller-id',
  status = BookStatus.FOR_SALE
}: Partial<Book> = {}) => {
  const props = {
    author,
    title,
    cover,
    createdAt,
    description,
    id,
    price,
    publicationDate,
    seller,
    status
  }
  return {
    withAuthor: (author: string) => bookBuilder({ ...props, author }),
    withTitle: (title: string) => bookBuilder({ ...props, title }),
    withCover: (cover: string) => bookBuilder({ ...props, cover }),
    withCreatedAt: (createdAt: Date) => bookBuilder({ ...props, createdAt }),
    withDescription: (description: string) =>
      bookBuilder({ ...props, description }),
    withId: (id: string) => bookBuilder({ ...props, id }),
    withPrice: (price: number) => bookBuilder({ ...props, price }),
    withPublicationDate: (publicationDate: Date) =>
      bookBuilder({ ...props, publicationDate }),
    withSeller: (seller: string) => bookBuilder({ ...props, seller }),
    withStatus: (status: BookStatus) => bookBuilder({ ...props, status }),
    build: () =>
      new Book(
        id,
        title,
        author,
        description,
        price,
        publicationDate,
        cover,
        createdAt,
        seller,
        status
      )
  }
}
