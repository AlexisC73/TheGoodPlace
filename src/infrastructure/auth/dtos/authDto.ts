import { Auth } from '../../../domain/auth/entities/auth'
import { Role } from '../../../domain/auth/entities/role'

export class AuthDTO {
  private constructor (
    private readonly _id: string,
    private readonly _access_token: string,
    private readonly _role: string,
    private readonly _avatarUrl: string
  ) {}

  toDomain (): Auth {
    return Auth.fromData({
      id: this.id,
      access_token: this.access_token,
      role: Role[this.role as keyof typeof Role],
      avatarUrl: this.avatarUrl
    })
  }

  get data () {
    return {
      id: this.id,
      access_token: this.access_token,
      role: this.role,
      avatarUrl: this.avatarUrl
    }
  }

  static fromData (data: AuthDTO['data']) {
    return new AuthDTO(data.id, data.access_token, data.role, data.avatarUrl)
  }

  static fromDomain (connection: Auth): AuthDTO {
    return new AuthDTO(
      connection.id,
      connection.access_token,
      connection.role.toString(),
      connection.avatarUrl
    )
  }

  get id () {
    return this._id
  }

  get access_token () {
    return this._access_token
  }

  get role () {
    return this._role
  }

  get avatarUrl () {
    return this._avatarUrl
  }
}
