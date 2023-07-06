import { UpdateAvatarPayload } from '../entities/payload/updateAvatarPayload'
import { ProfileRepository } from '../repositories/profileRepository'

export class UpdateAvatarUseCase {
  constructor (private readonly profileRepository: ProfileRepository) {}

  async handle (params: UpdateAvatarParams): Promise<string> {
    const { payload } = params
    const newAvatarURL = await this.profileRepository.updateAvatar(payload)
    return Promise.resolve(newAvatarURL)
  }
}

export type UpdateAvatarParams = {
  payload: UpdateAvatarPayload
}
