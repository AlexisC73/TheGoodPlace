import { UpdatePasswordPayload } from '../entities/payload/updatePassword'
import { ProfileRepository } from '@/domain/@shared/repositories/profileRepository'

export class UpdatePasswordUseCase {
  constructor (private readonly profileRepository: ProfileRepository) {}
  async handle (params: UpdatePasswordUseCaseParams) {
    const { payload } = params
    await this.profileRepository.updatePassword(payload)
  }
}

export type UpdatePasswordUseCaseParams = {
  payload: UpdatePasswordPayload
}
