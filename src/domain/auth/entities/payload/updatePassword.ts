import { Id } from '../../valueObjects/id'
import { Password } from '../../valueObjects/password'

export class UpdatePasswordPayload {
  constructor (
    public readonly _userId: Id,
    public readonly _password: Password,
    public readonly _newPassword: Password,
    public readonly _newPasswordConfirmation: Password
  ) {}

  get userId () {
    return this._userId.value
  }

  get oldPassword () {
    return this._password.value
  }

  get newPassword () {
    return this._newPassword.value
  }

  get newPasswordConfirmation () {
    return this._newPasswordConfirmation.value
  }
}
