import 'reflect-metadata'
import { BookRepository } from '@/domain/catalog/repositories/book'
import { InMemoryBookRepository } from '@/infrastructure/catalog/repositories/in-memory-book-repository'
import { Container } from 'inversify'
import { CatalogService } from '@/application/catalog/services/catalogService'
import { TYPES } from '@/application/catalog/container/types'

export const createCatalogContainer = () => {
  const catalogContainer = new Container()
  catalogContainer
    .bind<BookRepository>(TYPES.BookRepository)
    .to(InMemoryBookRepository)
    .inSingletonScope()
  catalogContainer
    .bind<CatalogService>(TYPES.CatalogService)
    .to(CatalogService)
    .inSingletonScope()
  return catalogContainer
}
