import { Email } from '../../valueObjects/email'
import { Password } from '../../valueObjects/password'

export class SignUpClientPayload {
  constructor (
    public readonly id: string,
    private readonly _email: Email,
    public readonly _password: Password,
    public readonly _passwordConfirmation: Password
  ) {}

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
