import { Auth } from '../entities/auth'
import { SignInPayload } from '../entities/signInPayload'
import { AuthRepository } from '../repositories/auth'

export class SignInUseCase {
  constructor (private readonly authRepository: AuthRepository) {}

  async handle (params: SignInParams): Promise<Auth> {
    const { payload } = params
    const auth = await this.authRepository.signIn(payload)
    return auth
  }
}

export type SignInParams = {
  payload: SignInPayload
}
