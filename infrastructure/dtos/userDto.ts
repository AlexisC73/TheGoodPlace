import { User } from '../../domain/entities/user'

export class UserDTO {
  private constructor(
    public id: string,
    public email: string,
    public name: string,
    public role: string,
    public avatarUrl: string
  ) {}

  get data() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      avatarUrl: this.avatarUrl,
    }
  }

  static fromData(data: UserDTO['data']) {
    return new UserDTO(
      data.id,
      data.email,
      data.name,
      data.role,
      data.avatarUrl
    )
  }

  toDomain() {
    return new User(this.email, this.name)
  }

  toStringJSON() {
    return JSON.stringify(this)
  }
}
