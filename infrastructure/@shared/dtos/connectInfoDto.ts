import { UserConnection } from '../../../domain/@shared/entities/connection'
import { Role } from '../../../domain/@shared/entities/role'

export class ConnectInfoDTO {
  private constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _email: string,
    private readonly _access_token: string,
    private readonly _role: string,
    private readonly _avatarUrl: string
  ) {}

  toDomain(): UserConnection {
    return new UserConnection(
      this.id,
      this.name,
      this.email,
      this.access_token,
      Role[this.role as keyof typeof Role],
      this.avatarUrl
    )
  }

  get data () {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      access_token: this.access_token,
      role: this.role,
      avatarUrl: this.avatarUrl
    }
  }

  static fromData(data: ConnectInfoDTO['data']) {
    return new ConnectInfoDTO(
      data.id,
      data.name,
      data.email,
      data.access_token,
      data.role,
      data.avatarUrl
    )
  }

  static fromDomain(connection: UserConnection): ConnectInfoDTO {
    return new ConnectInfoDTO(
      connection.id,
      connection.name,
      connection.email,
      connection.access_token,
      connection.role.toString(),
      connection.avatarUrl
    )
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get access_token() {
    return this._access_token
  }

  get role() {
    return this._role
  }

  get avatarUrl() {
    return this._avatarUrl
  }
}
