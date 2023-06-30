import { UpdatePasswordPayload } from '../entities/payload/updatePassword'
import { AuthRepository } from '../repositories/authRepository'

export class UpdatePasswordUseCase {
  constructor (private readonly authRepository: AuthRepository) {}
  async handle (params: UpdatePasswordUseCaseParams) {
    const { payload } = params
    await this.authRepository.updatePassword(payload)
  }
}

export type UpdatePasswordUseCaseParams = {
  payload: UpdatePasswordPayload
}
