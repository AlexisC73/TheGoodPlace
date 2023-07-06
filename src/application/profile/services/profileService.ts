import type { ProfileRepository } from '@/domain/profile/repositories/profileRepository'
import { inject, injectable } from 'inversify'
import { UpdateProfileUseCase } from '@/domain/profile/usecases/updateProfile'
import { TYPES } from '@/application/@shared/container/types'
import { UpdateAvatarUseCase } from '@/domain/profile/usecases/updateAvatar'
import { GetProfileUseCase } from '@/domain/profile/usecases/getProfile'

@injectable()
export class ProfileService {
  constructor (
    @inject(TYPES.ProfileRepository)
    private readonly profileRepository: ProfileRepository
  ) {}

  public GetUpdateProfileUseCase (): UpdateProfileUseCase {
    return new UpdateProfileUseCase(this.profileRepository)
  }

  public GetUpdateAvatarUseCase (): UpdateAvatarUseCase {
    return new UpdateAvatarUseCase(this.profileRepository)
  }

  public GetProfile (): GetProfileUseCase {
    return new GetProfileUseCase(this.profileRepository)
  }
}
