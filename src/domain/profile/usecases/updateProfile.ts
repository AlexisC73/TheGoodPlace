import { inject } from 'inversify'
import { UpdateProfilePayload } from '../entities/payload/updateProfilePayload'
import type { ProfileRepository } from '../repositories/profileRepository'
import { TYPES } from '@/application/profile/container/types'

export class UpdateProfileUseCase {
  constructor (
    @inject(TYPES.ProfileRepository)
    private readonly profileRepository: ProfileRepository
  ) {}

  async handle (params: UpdateProfileParams) {
    const { payload } = params
    this.profileRepository.update(payload)
  }
}

export type UpdateProfileParams = {
  payload: UpdateProfilePayload
}
