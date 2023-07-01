import { inject, injectable } from 'inversify'
import { UpdatePasswordPayload } from '../entities/payload/updatePassword'
import type { AuthRepository } from '../repositories/authRepository'
import { TYPES } from '@/config/types'

@injectable()
export class UpdatePasswordUseCase {
  constructor (
    @inject(TYPES.AuthRepository)
    private readonly authRepository: AuthRepository
  ) {}
  async handle (params: UpdatePasswordUseCaseParams) {
    const { payload } = params
    await this.authRepository.updatePassword(payload)
  }
}

export type UpdatePasswordUseCaseParams = {
  payload: UpdatePasswordPayload
}
