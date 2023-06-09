import { Email } from '@/domain/@shared/valueObject/email'
import { Id } from '@/domain/@shared/valueObject/id'
import { Name } from '@/domain/@shared/valueObject/name'

export class Profile {
  constructor (
    public readonly _id: Id,
    public readonly _email: Email,
    public readonly _lastname: Name,
    public readonly _firstname: Name,
    public readonly avatarUrl: string
  ) {}

  get id () {
    return this._id.value
  }

  get email () {
    return this._email.value
  }

  get lastname () {
    return this._lastname.value
  }

  get firstname () {
    return this._firstname.value
  }

  get data () {
    return {
      id: this.id,
      email: this.email,
      lastname: this.lastname,
      firstname: this.firstname,
      avatarUrl: this.avatarUrl
    }
  }

  static fromData (data: Profile['data']): Profile {
    return new Profile(
      Id.create(data.id),
      Email.create(data.email),
      Name.create(data.lastname),
      Name.create(data.firstname),
      data.avatarUrl
    )
  }

  copyWith (data: Partial<Profile['data']>): Profile {
    return Profile.fromData({
      ...this.data,
      ...data
    })
  }
}
