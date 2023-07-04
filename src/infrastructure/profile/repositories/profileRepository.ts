import { TYPES } from '@/application/@shared/container/types'
import { UpdateProfilePayload } from '@/domain/profile/entities/payload/updateProfilePayload'
import { ProfileRepository } from '@/domain/profile/repositories/profileRepository'
import type { LocalProfileDataSource } from '@/infrastructure/@shared/datasources/InMemoryProfile'
import { inject, injectable } from 'inversify'

@injectable()
export class InMemoryProfileRepository implements ProfileRepository {
  constructor (
    @inject(TYPES.LocalProfileDataSource)
    private readonly profileDataSource: LocalProfileDataSource
  ) {}
  update (payload: UpdateProfilePayload): Promise<void> {
    this.profileDataSource.update(payload)
    return Promise.resolve()
  }
}
