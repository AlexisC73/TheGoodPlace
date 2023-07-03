import 'reflect-metadata'
import {
  InMemoryProfileDataSource,
  LocalProfileDataSource
} from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { Container } from 'inversify'
import { TYPES } from './types'
import { ProfileService } from '../services/profileService'

export const profileContainer = new Container()
profileContainer
  .bind<LocalProfileDataSource>(TYPES.ProfileDataSource)
  .to(InMemoryProfileDataSource)
profileContainer
  .bind<ProfileService>(TYPES.ProfileService)
  .to(ProfileService)
  .inSingletonScope()
