import type { ProfileRepository } from '@/domain/profile/repositories/profileRepository'
import { inject, injectable } from 'inversify'
import { UpdateProfileUseCase } from '@/domain/profile/usecases/updateProfile'
import { TYPES } from '@/application/@shared/container/types'

@injectable()
export class ProfileService {
  constructor (
    @inject(TYPES.ProfileRepository)
    private readonly profileRepository: ProfileRepository
  ) {}

  public GetUpdateProfileUseCase (): UpdateProfileUseCase {
    return new UpdateProfileUseCase(this.profileRepository)
  }
}
