import { Email } from '../../../@shared/valueObject/email'
import { Id } from '../../../@shared/valueObject/id'
import { Password } from '../../../@shared/valueObject/password'

export class SignUpClientPayload {
  constructor (
    private readonly _id: Id,
    private readonly _email: Email,
    private readonly _password: Password,
    private readonly _passwordConfirmation: Password
  ) {}

  isValid (): boolean {
    return (
      this._id.isValid() &&
      this._email.isValid() &&
      this._password.isValid() &&
      this._passwordConfirmation.isValid()
    )
  }

  get id (): string {
    return this._id.value
  }

  get email (): string {
    return this._email.value
  }

  get password (): string {
    return this._password.value
  }

  get passwordConfirmation (): string {
    return this._passwordConfirmation.value
  }

  passwordMatch (): boolean {
    return this._password.equals(this._passwordConfirmation)
  }
}
