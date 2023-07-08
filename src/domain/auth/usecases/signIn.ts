import { inject, injectable } from 'inversify'
import { SignInPayload } from '../entities/payload/signInPayload'
import { AuthRepository } from '../repositories/authRepository'
import { PayloadError } from '../error/errors'

@injectable()
export class SignInUseCase {
  constructor (
    @inject(AuthRepository)
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
