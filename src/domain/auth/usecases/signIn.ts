import { SignInPayload } from '../entities/payload/signInPayload'
import { AuthRepository } from '../repositories/authRepository'

export class SignInUseCase {
  constructor (private readonly authRepository: AuthRepository) {}
  async handle (params: SignInUseCaseParams) {
    const { payload } = params
    return this.authRepository.signIn(payload)
  }
}

export type SignInUseCaseParams = {
  payload: SignInPayload
}
