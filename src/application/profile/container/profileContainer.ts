import 'reflect-metadata'
import {
  InMemoryProfileDataSource,
  LocalProfileDataSource
} from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { Container } from 'inversify'
import { TYPES } from './types'

export const profileContainer = new Container()
profileContainer
  .bind<LocalProfileDataSource>(TYPES.ProfileDataSource)
  .to(InMemoryProfileDataSource)
