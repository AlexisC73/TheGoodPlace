import { ProfileRepository } from '../repositories/profileRepository'

export class GetProfileUseCase {
  constructor (private readonly profileRepository: ProfileRepository) {}

  async handle (id: string) {
    let profile = await this.profileRepository.getProfile(id)
    return profile
  }
}
