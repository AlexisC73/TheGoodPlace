import { Email } from '../../valueObjects/email'
import { Id } from '../../valueObjects/id'
import { Password } from '../../valueObjects/password'

export class SignUpClientPayload {
  constructor (
    private readonly _id: Id,
    private readonly _email: Email,
    private readonly _password: Password,
    private readonly _passwordConfirmation: Password
  ) {}

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
