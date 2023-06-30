import { ProfileRepository } from '@/domain/@shared/repositories/profileRepository'
import { SignInPayload } from '../entities/payload/signInPayload'
import { AuthRepository } from '../repositories/authRepository'

export class SignInUseCase {
  constructor (
    private readonly profileRepository: ProfileRepository,
    private readonly authRepository: AuthRepository
  ) {}
  async handle (params: SignInUseCaseParams) {
    const { payload } = params
    const userId = await this.profileRepository.signIn(payload)
    if (!userId) throw new Error("Something went wrong, or user won't exist")
    return this.authRepository.signIn(userId)
  }
}

export type SignInUseCaseParams = {
  payload: SignInPayload
}
