import { User } from '../../../domain/user/entities/user'

export class UserDTO {
  private constructor (
    private readonly _id: string,
    private readonly _email: string,
    private readonly _name: string,
    private readonly _role: string,
    private readonly _avatarUrl: string
  ) {}

  get data () {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      avatarUrl: this.avatarUrl
    }
  }

  static fromData (data: UserDTO['data']) {
    return new UserDTO(
      data.id,
      data.email,
      data.name,
      data.role,
      data.avatarUrl
    )
  }

  toDomain () {
    return User.fromData({
      id: this.id,
      email: this.email,
      name: this.name,
      avatarUrl: this.avatarUrl
    })
  }

  toStringJSON () {
    return JSON.stringify(this)
  }

  get id () {
    return this._id
  }

  get email () {
    return this._email
  }

  get name () {
    return this._name
  }

  get role () {
    return this._role
  }

  get avatarUrl () {
    return this._avatarUrl
  }
}
