import { SignUpClientPayload } from '../entities/payload/signUpClientPayload'
import { AuthRepository } from '../repositories/authRepository'

export class SignupClientUseCase {
  constructor (private readonly authRepository: AuthRepository) {}

  async handle (command: SignUpClientParams) {
    const { payload } = command
    if (!payload.isValid()) {
      throw new Error('Invalid payload')
    }
    if (!payload.passwordMatch()) {
      throw new Error('Les mots de passe ne correspondent pas')
    }
    const authClient = await this.authRepository.signUp(payload)
    return authClient
  }
}

export type SignUpClientParams = {
  payload: SignUpClientPayload
}
