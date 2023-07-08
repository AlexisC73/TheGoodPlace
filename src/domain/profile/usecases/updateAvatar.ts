import { inject, injectable } from 'inversify'
import { UpdateAvatarPayload } from '../entities/payload/updateAvatarPayload'
import { ProfileRepository } from '../repositories/profileRepository'
import 'reflect-metadata'

@injectable()
export class UpdateAvatarUseCase {
  constructor (
    @inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository
  ) {}

  async handle (params: UpdateAvatarParams): Promise<string> {
    const { payload } = params
    const newAvatarURL = await this.profileRepository.updateAvatar(payload)
    return Promise.resolve(newAvatarURL)
  }
}

export type UpdateAvatarParams = {
  payload: UpdateAvatarPayload
}
