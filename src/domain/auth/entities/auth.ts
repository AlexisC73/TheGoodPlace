import { Id } from '@/domain/@shared/valueObject/id'
import { Role } from './role'

export class Auth {
  constructor (
    public readonly _id: Id,
    public readonly access_token: string,
    public readonly role: Role
  ) {}

  get id () {
    return this._id.value
  }

  get data () {
    return {
      id: this.id,
      access_token: this.access_token,
      role: this.role
    }
  }

  static fromData (data: Auth['data']) {
    return new Auth(Id.create(data.id), data.access_token, data.role)
  }

  copyWith (data: Partial<Auth['data']>) {
    return new Auth(
      Id.create(data.id ?? this.id),
      data.access_token ?? this.access_token,
      data.role ?? this.role
    )
  }
}
