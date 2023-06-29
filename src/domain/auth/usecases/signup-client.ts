import { SignUpClientPayload } from '../entities/payload/signUpClientPayload'
import { AuthRepository } from '../repositories/auth'

export class SignupClientUseCase {
  constructor (private readonly authRepository: AuthRepository) {}

  handle (command: SignUpClientParams) {
    const { payload } = command
    if (!payload.passwordMatch()) {
      throw new Error('Les mots de passe ne correspondent pas')
    }
    const createdClient = this.authRepository.signupClient(payload)
    return createdClient
  }
}

export type SignUpClientParams = {
  payload: SignUpClientPayload
}
