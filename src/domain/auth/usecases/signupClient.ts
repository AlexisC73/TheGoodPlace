import { inject, injectable } from 'inversify'
import { SignUpClientPayload } from '../entities/payload/signUpClientPayload'
import type { AuthRepository } from '../repositories/authRepository'
import { TYPES } from '@/application/auth/container/types'
import { PayloadError } from '../error/errors'

@injectable()
export class SignupClientUseCase {
  constructor (
    @inject(TYPES.AuthRepository)
    private readonly authRepository: AuthRepository
  ) {}

  async handle (command: SignUpClientParams) {
    const { payload } = command
    if (!payload.isValid()) {
      throw new PayloadError()
    }
    if (!payload.passwordMatch()) {
      throw new PayloadError('Password not match')
    }
    const authClient = await this.authRepository.signUp(payload)
    return authClient
  }
}

export type SignUpClientParams = {
  payload: SignUpClientPayload
}
