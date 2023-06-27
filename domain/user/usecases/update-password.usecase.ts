import { UserRepository } from '../../@shared/repositories/user'

export class UpdateUserPasswordUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async handle (command: UpdateUserPasswordCommand) {
    if (command.newPassword !== command.newPasswordConfirmation)
      throw new Error('New password and confirmation does not match')

    return this.userRepository.updateUserPassword({
      id: command.id,
      newPassword: command.newPassword,
      oldPassword: command.oldPassword
    })
  }
}

export type UpdateUserPasswordCommand = {
  id: string
  oldPassword: string
  newPassword: string
  newPasswordConfirmation: string
}
