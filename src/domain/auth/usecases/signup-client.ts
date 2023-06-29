import { SignUpClientPayload } from '../entities/signUpClientPayload'
import { AuthRepository } from '../repositories/auth'

export class SignupClientUseCase {
  constructor (private readonly authRepository: AuthRepository) {}

  handle (command: SignUpClientParams) {
    const { payload } = command
    const createdClient = this.authRepository.signupClient(payload)
    return createdClient
  }
}

export type SignUpClientParams = {
  payload: SignUpClientPayload
}
