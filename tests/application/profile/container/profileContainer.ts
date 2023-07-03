import 'reflect-metadata'
import { TYPES } from '@/application/profile/container/types'
import { ProfileService } from '@/application/profile/services/profileService'
import { ProfileRepository } from '@/domain/profile/repositories/profileRepository'
import {
  InMemoryProfileDataSource,
  LocalProfileDataSource
} from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { InMemoryProfileRepository } from '@/infrastructure/profile/repositories/profileRepository'
import { Container } from 'inversify'

export const createProfileContainer = () => {
  const profileContainer = new Container()
  profileContainer
    .bind<LocalProfileDataSource>(TYPES.ProfileDataSource)
    .to(InMemoryProfileDataSource)
    .inSingletonScope()
  profileContainer
    .bind<ProfileRepository>(TYPES.ProfileRepository)
    .to(InMemoryProfileRepository)
    .inSingletonScope()
  profileContainer
    .bind<ProfileService>(TYPES.ProfileService)
    .to(ProfileService)
    .inSingletonScope()

  return profileContainer
}
