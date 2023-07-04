import { inject, injectable } from 'inversify'
import { SignInPayload } from '../entities/payload/signInPayload'
import type { AuthRepository } from '../repositories/authRepository'
import { PayloadError } from '../error/errors'
import { TYPES } from '@/application/@shared/container/types'

@injectable()
export class SignInUseCase {
  constructor (
    @inject(TYPES.AuthRepository)
    private readonly authRepository: AuthRepository
  ) {}
  async handle (params: SignInUseCaseParams) {
    const { payload } = params
    if (!payload.isValid()) {
      throw new PayloadError()
    }
    return this.authRepository.signIn(payload)
  }
}

export type SignInUseCaseParams = {
  payload: SignInPayload
}
