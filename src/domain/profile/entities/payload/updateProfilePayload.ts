import { Email } from '@/domain/@shared/valueObject/email'
import { Id } from '@/domain/@shared/valueObject/id'
import { Password } from '@/domain/@shared/valueObject/password'

export class UpdateProfilePayload {
  constructor (
    public readonly _userId: Id,
    public readonly _email: Email,
    public readonly lastname: string,
    public readonly firstname: string,
    public readonly _password: Password
  ) {}

  get userId () {
    return this._userId.value
  }

  get email () {
    return this._email.value
  }

  get password () {
    return this._password.value
  }

  get data () {
    return {
      userId: this.userId,
      email: this.email,
      lastname: this.lastname,
      firstname: this.firstname,
      password: this.password
    }
  }
}
