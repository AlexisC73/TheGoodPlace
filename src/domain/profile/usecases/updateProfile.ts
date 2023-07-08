import { inject, injectable } from 'inversify'
import { UpdateProfilePayload } from '../entities/payload/updateProfilePayload'
import { ProfileRepository } from '../repositories/profileRepository'

@injectable()
export class UpdateProfileUseCase {
  constructor (
    @inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository
  ) {}

  async handle (params: UpdateProfileParams) {
    const { payload } = params
    if (!payload.isValid()) throw new Error('Invalid payload')
    this.profileRepository.update(payload)
  }
}

export type UpdateProfileParams = {
  payload: UpdateProfilePayload
}
