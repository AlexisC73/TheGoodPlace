import { AuthRepository } from '../repositories/authRepository'
import { Auth } from '../entities/auth'

export class GetProfileUseCase {
  constructor (private readonly authRepository: AuthRepository) {}

  async handle (params: GetProfileUseCaseParams) {
    const { auth } = params
    if (!auth || !auth.access_token) {
      throw new Error('Invalid auth')
    }
    let profile = await this.authRepository.getProfile(auth.access_token)
    return profile
  }
}

export type GetProfileUseCaseParams = {
  auth: Auth
}
