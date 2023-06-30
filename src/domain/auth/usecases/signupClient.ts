import { ProfileRepository } from '@/domain/@shared/repositories/profileRepository'
import { SignUpClientPayload } from '../entities/payload/signUpClientPayload'
import { AuthRepository } from '../repositories/authRepository'

export class SignupClientUseCase {
  constructor (
    private readonly authRepository: AuthRepository,
    private readonly profileRepository: ProfileRepository
  ) {}

  async handle (command: SignUpClientParams) {
    const { payload } = command
    if (!payload.passwordMatch()) {
      throw new Error('Les mots de passe ne correspondent pas')
    }
    await this.profileRepository.createProfile(payload)
    const authClient = await this.authRepository.createAuthClient(payload.id)
    return authClient
  }
}

export type SignUpClientParams = {
  payload: SignUpClientPayload
}
