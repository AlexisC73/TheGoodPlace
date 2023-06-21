import { Book, BookStatus } from '../../entities/book'

export const bookBuilder = ({
  author = 'Alice',
  title = 'Alice in Wonderland',
  cover = 'https://images-na.ssl-images-amazon.com/images/I/51ZU%2BCvkTyL._SX331_BO1,204,203,200_.jpg',
  createdAt = new Date('2023-07-20T13:00:00Z'),
  description = 'Test de description',
  id = 'test',
  price = 10,
  publicationDate = '2021-07-20',
  seller = 'seller',
  status = BookStatus.FOR_SALE,
}: Partial<Book> = {}) => {
  return {
    withAuthor: (author: string) => bookBuilder({ ...bookBuilder(), author }),
    withTitle: (title: string) => bookBuilder({ ...bookBuilder(), title }),
    withCover: (cover: string) => bookBuilder({ ...bookBuilder(), cover }),
    withCreatedAt: (createdAt: Date) =>
      bookBuilder({ ...bookBuilder(), createdAt }),
    withDescription: (description: string) =>
      bookBuilder({ ...bookBuilder(), description }),
    withId: (id: string) => bookBuilder({ ...bookBuilder(), id }),
    withPrice: (price: number) => bookBuilder({ ...bookBuilder(), price }),
    withPublicationDate: (publicationDate: string) =>
      bookBuilder({ ...bookBuilder(), publicationDate }),
    withSeller: (seller: string) => bookBuilder({ ...bookBuilder(), seller }),
    withStatus: (status: BookStatus) =>
      bookBuilder({ ...bookBuilder(), status }),
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
      ),
  }
}
