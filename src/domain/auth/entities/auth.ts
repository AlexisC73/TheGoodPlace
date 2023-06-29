import { Role } from './role'

export class Auth {
  constructor (
    public readonly id: string,
    public readonly access_token: string,
    public readonly role: Role,
    public readonly email: string
  ) {}

  get data () {
    return {
      id: this.id,
      access_token: this.access_token,
      role: this.role,
      email: this.email
    }
  }

  static fromData (data: Auth['data']) {
    return new Auth(data.id, data.access_token, data.role, data.email)
  }

  copyWith (data: Partial<Auth['data']>) {
    return new Auth(
      data.id ?? this.id,
      data.access_token ?? this.access_token,
      data.role ?? this.role,
      data.email ?? this.email
    )
  }
}
