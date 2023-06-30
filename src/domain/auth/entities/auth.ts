import { Role } from './role'

export class Auth {
  constructor (
    public readonly id: string,
    public readonly access_token: string,
    public readonly role: Role
  ) {}

  get data () {
    return {
      id: this.id,
      access_token: this.access_token,
      role: this.role
    }
  }

  static fromData (data: Auth['data']) {
    return new Auth(data.id, data.access_token, data.role)
  }

  copyWith (data: Partial<Auth['data']>) {
    return new Auth(
      data.id ?? this.id,
      data.access_token ?? this.access_token,
      data.role ?? this.role
    )
  }
}
