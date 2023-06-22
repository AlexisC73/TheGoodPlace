import { UserConnection } from '../../domain/entities/connection'
import { Role } from '../../domain/entities/user'

export class ConnectInfoDTO {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public access_token: string,
    public role: string,
    public avatarUrl: string
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
}
