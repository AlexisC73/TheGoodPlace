import { Email } from '../../valueObjects/email'
import { Password } from '../../valueObjects/password'

export class SignInPayload {
  constructor (
    public readonly _email: Email,
    public readonly _password: Password
  ) {}

  isValid (): boolean {
    return this._email.isValid() && this._password.isValid()
  }

  get email (): string {
    return this._email.value
  }

  get password (): string {
    return this._password.value
  }
}
