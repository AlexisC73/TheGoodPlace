import { Email } from '../../valueObjects/email'

export class SignInPayload {
  constructor (
    private readonly _email: Email,
    public readonly password: string
  ) {}

  get email (): string {
    return this._email.value
  }
}
