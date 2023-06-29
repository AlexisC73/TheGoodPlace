import { UpdatePasswordPayload } from '../entities/payload/updatePassword'
import { AuthRepository } from '../repositories/auth'

export class UpdatePassword {
  constructor (private readonly authRepository: AuthRepository) {}

  async handle (params: UpdatePasswordParams) {
    const { payload } = params
    if (!payload._newPassword.equals(payload._newPasswordConfirmation)) {
      throw new Error('New password and confirmation do not match')
    }
    return this.authRepository.updatePassword(payload)
  }
}

export type UpdatePasswordParams = {
  payload: UpdatePasswordPayload
}
