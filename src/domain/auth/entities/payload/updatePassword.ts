import { Id } from '../../../@shared/valueObject/id'
import { Password } from '../../../@shared/valueObject/password'

export class UpdatePasswordPayload {
  constructor (
    public readonly _userId: Id,
    public readonly _password: Password,
    public readonly _newPassword: Password,
    public readonly _newPasswordConfirmation: Password
  ) {}

  isValid (): boolean {
    return (
      this._userId.isValid() &&
      this._password.isValid() &&
      this._newPassword.isValid() &&
      this._newPasswordConfirmation.isValid()
    )
  }

  passwordMatch (): boolean {
    return this._newPassword.equals(this._newPasswordConfirmation)
  }

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
